import React, { useState } from 'react';

interface Props {
    loadTheData(): void
}

function CharacterForm({ loadTheData }: Props) {

    const [name, setName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    function addCharacter(name: string, imageUrl: string) {

        fetch('http://localhost:3500/characters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, imageUrl: imageUrl })
        })
        .then(() => {
            loadTheData();
        });
    }

    function completeForm() {
        addCharacter(name, imageUrl);
        setName('');
        setImageUrl('');
    }

    return (
        <div className="character-form">
            <label>Name:</label>
            <input value={name} onChange={(evt) => {setName(evt.target.value)}} />

            <label>Image Url:</label>
            <input value={imageUrl} onChange={(evt) => {setImageUrl(evt.target.value)}} />

            <button onClick={completeForm}>Save</button>
        </div>
    );
}

export default CharacterForm;