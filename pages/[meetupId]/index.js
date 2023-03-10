import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData: { image, title, address, description } }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta description="name" content={description} />
            </Head>
            <MeetupDetail
                image={image}
                title={title}
                address={address}
                description={description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://maximilian:Maximilian1@cluster0.9znw4cu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            }
        })),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    console.log(meetupId); // will run in server terminal on page request

    const client = await MongoClient.connect('mongodb+srv://maximilian:Maximilian1@cluster0.9znw4cu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    console.log(selectedMeetup);

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                desciption: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;