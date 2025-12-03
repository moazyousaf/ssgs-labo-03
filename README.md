# Password Strength Toolkit

Il tool **Password Strengh Toolkit** consente di analizzare una password fornita da riga di comando e restituire un'analisi della sua robustezza basata su un set di regole.

## Installazione

### Prerequisiti

- **Node.js**
- **npm**

### Passaggi

1. Clonazione repo

```bash
    git clone [https://github.com/tuo-utente/password-strength-toolkit.git]
```

2. Navigazione

```bash
cd ssgs-labo-03
```

3. Installazione

```bash
npm install
```

## Utilizzo

Il tool supporta i comandi `analyze` e `generate`

### 1. Analisi della robustezza (analyze)

Esegue un'analisi completa della password fornita

```bash
node index.js analyze "<password-da-analizzare>"
```

### 2. Generazione Password sicura (generate)

Genera una password sicura della lunghezza specificata

```bash
node index.js generate [lunghezza]
```
