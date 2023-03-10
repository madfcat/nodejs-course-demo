import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetUp() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {

        // console.log(enteredMeetupData);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push("/");
    }

    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta description="name" content="Add your own meetups and create amazing networking opportunities." />
            </Head>
            <h1>New Meetup</h1>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}


export default NewMeetUp;
