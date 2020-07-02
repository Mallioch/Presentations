import React, { useState, useEffect } from 'react';
import './App.css';
import Counter from './Counter';
import Character from './Character';
import CharacterList from './CharacterList';
import CharacterForm from './CharacterForm';

function App() {

    const [characters, setCharacters] = useState<Array<Character>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const characters = [
    //     new Character(1, 'Trogdor the Burninator', 'https://art.pixilart.com/abd2ee11e16c69f.png'),
    //     new Character(2, 'Chris Benardinator', 'https://i.redd.it/e12mw23ul0u01.png')
    // ];
    
    function loadTheData() {
        setIsLoading(true);
        fetch('http://localhost:3500/characters')
            .then(response => response.json())
            .then(data => {
                setCharacters(data);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        loadTheData();
    }, []);




    return (
        <div className="App">
            <header className="App-header">
                <h1>Super Cool Fantasy Character Creator with React, Typescript, and Hooks</h1>
            </header>

            <Counter />

            <CharacterList
                characters={characters}
                isLoading={isLoading}
            />

            <CharacterForm
                loadTheData={loadTheData}
            />

        </div>
    );
}

export default App;
