import { useEffect, useState } from 'react';
import './Battle.css';

const ENEMY_CLASS = {
    START: '__enemyStart',
    DEFAULT: '__enemyDefault',
    ATTACK: '__enemyAttack',
}

const PLAYER_CLASS = {
    START: '__playerStart',
    DEFAULT: '__playerDefault',
    ATTACK: '__playerAttack',
}

const DAMAGE = 40;

const Battle = ({ enemy, goToMenu, pokemon }) => {
    const [attack, setAttack] = useState(false);
    const [enemyHealth, setEnemyHealth] = useState(100);
    const [critical, setCritical] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [playerClass, setPlayerClass] = useState(PLAYER_CLASS.START);
    const [enemyClass, setEnemyClass] = useState(ENEMY_CLASS.START);

    // Coming in animation
    useEffect(() => {
        setPlayerClass(PLAYER_CLASS.DEFAULT);
        setEnemyClass(ENEMY_CLASS.DEFAULT);
    }, []);

    // Set attack animation, remove 2 health per attack
    // and use a 1 second delay to reset.
    useEffect(() => {
        if (attack) {
            setPlayerClass(PLAYER_CLASS.ATTACK);
            setTimeout(() => {
                setPlayerClass(PLAYER_CLASS.DEFAULT);
                setAttack(false);
                setEnemyHealth(prevHealth => prevHealth - DAMAGE);
            }, 900);
        }
    }, [attack]);

    useEffect(() => {
        if (enemyHealth <= 0) {
            setGameOver(true);
        }

        if (enemyHealth < 40 && !critical) {
            setCritical(true);
        }
    }, [enemyHealth, critical]);

    if (gameOver) {
        return (
            <div>
                <h2>You Win!</h2>
                <button onClick={goToMenu}>Play Again</button>
            </div>
        );
    }

    return (
        <div>
            <div className='PlayerContainer'>
                <div className={`EnemyHealth ${critical && '__critical'}`} style={{ width: `${enemyHealth}px` }} />
                <img 
                    alt={enemy.name}
                    className={`PokemonAvatar ${enemyClass}`}
                    src={enemy.sprites.front_default}
                />
            </div>
            <div className='PlayerContainer'>
                <img
                    alt={pokemon.name}
                    className={`PokemonAvatar ${playerClass}`}
                    src={pokemon.sprites.back_default}
                />
                {!attack && <button className='AttackButton' onClick={() => setAttack(true)}>Attack!</button>}
            </div>
        </div>
    );
}

export default Battle;