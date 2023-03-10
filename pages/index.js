import Head from "next/head";
import { MongoClient } from "mongodb"
import MeetupList from "../components/meetups/MeetupList"

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         title: 'First Meetup',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         title: 'First Meetup',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a first meetup!'
//     }
// ];

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta description="name" content="Browse a huge list of React meetups"/>
            </Head>
            <h1>HomePage</h1>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// export async function getServerSideProps(context) {
//     const request = context.req;
//     const respones = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://maximilian:Maximilian1@cluster0.9znw4cu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    console.log(meetups);

    client.close();

    // res.status(201).json({ message: 'Meetup fetched!' })

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 3600 // seconds to rebuild page on server
    }
}

export default HomePage