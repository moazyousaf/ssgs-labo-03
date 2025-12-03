const {
  analyzePassword,
  checkPasswordRule,
  generateSecurePassword,
} = require('../src/passwordValidator');

//FUNZIONE 1
describe('Check Password Rule', () => {
  test('Deve restituire TRUE per password con lunghezza >= 8', () => {
    expect(checkPasswordRule('minLength', '12345678')).toBe(true);
  });

  test('Deve restituire FALSE se manca il carattere maiuscolo', () => {
    expect(checkPasswordRule('hasUppercase', 'password')).toBe(false);
  });

  test('Deve lanciare un errore se la regola non è definita', () => {
    expect(checkPasswordRule('regolaInesistente', 'password')).toThrow(
      'Regola non valida: regolaInesistente'
    );
  });
});

//FUNZIONE 2
describe('Password Validator', () => {
  test("Deve lanciare un errore se l'input non è una stringa", () => {
    expect(analyzePassword(123)).toThrow('Input must be a string.');
  });

  test('Deve restituire un oggetto con score, verdict e rules', () => {
    const result = analyzePassword('test');

    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('verdict');
    expect(result).toHaveProperty('rules');

    // 'rules' deve essere un array
    expect(Array.isArray(result.rules)).toBe(true);
    // score deve essere un numero
    expect(typeof result.score).toBe('number');
  });

  test('Deve restituire 25 punti e Verdetto "Molto Debole"', () => {
    const result = analyzePassword(TEST_PASSWORDS.low);
    expect(result.score).toBe(25);
    expect(result.verdict).toBe('Molto Debole');
  });
  test('dovrebbe restituire 50 punti e Verdetto "Media"', () => {
    const result = analyzePassword(TEST_PASSWORDS.medium);
    expect(result.score).toBe(50);
    expect(result.verdict).toBe('Media');
  });

  test('dovrebbe restituire 75 punti e Verdetto "Forte"', () => {
    const result = analyzePassword(TEST_PASSWORDS.high);
    expect(result.score).toBe(75);
    expect(result.verdict).toBe('Forte');
  });

  test('dovrebbe restituire 100 punti e Verdetto "Molto Forte"', () => {
    const result = analyzePassword(TEST_PASSWORDS.max);
    expect(result.score).toBe(100);
    expect(result.verdict).toBe('Molto Forte');
  });
});

//FUNZIONE 3
describe('generateSecurePassword', () => {
  test('Deve lanciare un errore se la lunghezza è inferiore a 8', () => {
    expect(() => generateSecurePassword(7)).toThrow(
      'La lunghezza non può essere inferiore a 8 caratteri.'
    );
  });
  test('Deve generare una password con la lunghezza specificata', () => {
    const length = 15;
    const password = generateSecurePassword(length);
    expect(password.length).toBe(length);
  });
  test('Deve generare una password che soddisfa tutti i criteri', () => {
    const password = generateSecurePassword(14);
    const result = analyzePassword(password);

    // Controlliamo che tutte le 4 regole valgano 25 punti (totale 100)
    expect(result.score).toBe(100);
    expect(result.verdict).toBe('Molto Forte');
  });
});
