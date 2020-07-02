import React from 'react';
import Character from './Character';
import './CharacterList.css';

interface Props {
    characters: Array<Character>,
    isLoading: boolean
}

function CharacterList({ characters, isLoading } : Props) {

    let stylez = {
        color: 'blue'
    };

    let loadingMessage;
    if (isLoading) {
        loadingMessage = (
            <p>Yo, the data is loading.</p>
        );
    }

    return (
        <div className="character-list">

            {loadingMessage}

            {characters.map((character) => {
                return (
                    <div key={character.id}>
                        <span style={stylez}>{character.name}</span>
                        <img src={character.imageUrl} alt={character.name} />
                    </div>
                );
            })}

        </div>
    );
}

export default CharacterList;