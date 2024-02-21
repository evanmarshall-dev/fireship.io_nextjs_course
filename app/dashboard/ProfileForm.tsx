'use client';

// Component itself will take the user as a prop.
export function ProfileForm({ user }: any) {
  // After the user fills out the form and submits it we will run the updateUser function.
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default so it does not refresh the page.
    e.preventDefault();

    // Then we collect the form data from the form itself with the browser formData object.
    const formData = new FormData(e.currentTarget);

    // This is the data we want to use for the new user bio.
    const body = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      age: formData.get('age'),
      image: formData.get('image'),
    };

    // To update the record in the database we will need to send the data to a backend endpoint somewhere.
    // We will do this by using the fetch API and PUT request to an endpoint at /api/user.
    const res = await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await res.json();
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      {/* When the form is submitted we will intercept the submit event and run a function called updateUser. */}
      <form onSubmit={updateUser}>
        <label htmlFor='name'>Name</label>
        {/* All of the inputs (name, bio, age and image URL) below have a default value which is based on the user that comes in as a prop. */}
        <input type='text' name='name' defaultValue={user?.name ?? ''} />
        <label htmlFor='bio'>Bio</label>
        <textarea
          name='bio'
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ''}
        ></textarea>
        <label htmlFor='age'>Age</label>
        <input type='text' name='age' defaultValue={user?.age ?? 0} />
        <label htmlFor='image'>Profile Image URL</label>
        <input type='text' name='image' defaultValue={user?.image ?? ''} />

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
