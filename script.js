// Pokemon Class
class Pokemon {
    constructor(name, health, attackDamage) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attackDamage = attackDamage;
    }

    attack(opponent) {
        const damage = Math.floor(Math.random() * this.attackDamage) + 1;
        opponent.health -= damage;
        if (opponent.health < 0) opponent.health = 0;
        return `${this.name} attacks ${opponent.name} for ${damage} damage!`;
    }

    heal() {
        const healAmount = Math.floor(Math.random() * 10) + 1;
        this.health += healAmount;
        if (this.health > this.maxHealth) this.health = this.maxHealth;
        return `${this.name} heals for ${healAmount} HP!`;
    }
}

// Trainer Class (optional for more complexity later)
class Trainer {
    constructor(name, pokemons) {
        this.name = name;
        this.pokemons = pokemons;
        this.currentPokemon = 0;
    }

    getActivePokemon() {
        return this.pokemons[this.currentPokemon];
    }
}

// Game Logic
let player1 = new Pokemon("Pikachu", 50, 12);
let player2 = new Pokemon("Charmander", 45, 10);

const player1NameElement = document.getElementById('player1-name');
const player1HpElement = document.getElementById('player1-hp');
const player2NameElement = document.getElementById('player2-name');
const player2HpElement = document.getElementById('player2-hp');
const logElement = document.getElementById('log');

// Initialize game
function updateUI() {
    player1NameElement.textContent = player1.name;
    player1HpElement.textContent = `HP: ${player1.health}/${player1.maxHealth}`;

    player2NameElement.textContent = player2.name;
    player2HpElement.textContent = `HP: ${player2.health}/${player2.maxHealth}`;
}

function logAction(message) {
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logElement.appendChild(logMessage);
    logElement.scrollTop = logElement.scrollHeight; // auto scroll to the bottom
}

document.getElementById('attack-button').addEventListener('click', () => {
    if (player1.health > 0 && player2.health > 0) {
        logAction(player1.attack(player2));
        updateUI();

        if (player2.health === 0) {
            logAction(`${player2.name} has fainted! Player 1 wins!`);
        } else {
            logAction(player2.attack(player1));
            updateUI();

            if (player1.health === 0) {
                logAction(`${player1.name} has fainted! Player 2 wins!`);
            }
        }
    }
});

document.getElementById('heal-button').addEventListener('click', () => {
    if (player1.health > 0) {
        logAction(player1.heal());
        updateUI();
    }

    if (player2.health > 0) {
        logAction(player2.heal());
        updateUI();
    }
});

document.getElementById('restart-button').addEventListener('click', () => {
    player1.health = player1.maxHealth;
    player2.health = player2.maxHealth;
    logElement.innerHTML = '';
    updateUI();
});

updateUI();
