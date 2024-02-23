// * Actions ONLY work on forms and things inside forms because server side components cannot handle client side actions like button clicks.
import kv from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import styles from './page.module.css';
import { redirect } from 'next/navigation';

// This creates a dog object so that we can use it below as default values on the form.
interface Dog {
  name: string;
  image: string;
  breed: string;
}

export default async function DogEditPage({
  params,
}: {
  params: { id: string };
}) {
  // First, we are fetching data in the server component and using vercel's new key value database.
  const key = `dogs:${params.id}`;
  const dog = await kv.get<Dog>(key);

  // Here is the function called upon in the form action below.
  // The function receives the form data as an argument.
  async function upDog(formData: FormData) {
    // Use server directive allows next js to turn this into a sever side endpoint. You can access things such as headers and cookies.
    'use server';

    // Mutate data
    // Take out form data and update the database.
    await kv.set(key, {
      name: formData.get('title'),
      image: formData.get('image'),
      breed: formData.get('breed'),
    });

    // Revalidate
    // This will automatically update the UI after the mutation is complete.
    revalidatePath(`/dogs/${params.id}/edit`);
  }

  // Second function that works like upDog, but redirects to the main profile. Like a save and quit feature.
  async function upDogDeuce(formData: FormData) {
    'use server';
    await kv.set(key, {
      name: formData.get('title'),
      image: formData.get('image'),
      breed: formData.get('breed'),
    });

    redirect(`/dogs/${params.id}`);
  }

  return (
    <div className={styles.cardBody}>
      <h2>Edit {dog?.name}</h2>

      {/* Special property that takes a function and provides the data from the form to run server side code on submit. */}
      <form action={upDog}>
        <label>Name</label>
        <input name='title' type='text' defaultValue={dog?.name} />
        <label>Image</label>
        <input name='image' type='text' defaultValue={dog?.image} />
        <label>Breed</label>
        <input name='breed' type='text' defaultValue={dog?.breed} />
        <button type='submit'>Save and Continue</button>

        {/* You can use multiple actions on the same form */}
        <button formAction={upDogDeuce}>Save and Quit</button>
      </form>
    </div>
  );
}
