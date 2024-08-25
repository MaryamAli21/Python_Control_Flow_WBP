let mockConsoleLog;

// The prompt-sync module exports a default function so some pains have to be taken here to mock it properly
// See: https://stackoverflow.com/a/68906447
let mockPrompt;
jest.mock('prompt-sync', () => {
  return () => {
    return x => mockPrompt(x);
  }
});

describe('The main program', () => {

  beforeEach(() => {
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() =>
    mockConsoleLog.mockRestore()
  );

  it('should calculate change correctly', () => {
    mockPrompt = prompt => {
      if (prompt === '(Example: 99, 35, 34): ')
        return '100, 50, 25';
      else if (prompt === 'How much did the customer pay? ')
        return '200.0';
      else if (prompt === 'Can we keep the change as a tip? (y/N): ')
        return '';
    }

    jest.isolateModules ( () => require('../src/main') );

    expect(mockConsoleLog.mock.calls[1][0]).toBe('The total bill for all 3 items (including tax) is: $186.38');
    expect(mockConsoleLog.mock.calls[2][0]).toBe('Return $13.62 to the customer');
  });

  it('should allow change to be kept as tip', () => {
    mockPrompt = prompt => {
      if (prompt === '(Example: 99, 35, 34): ')
        return '100, 50,25.0';
      else if (prompt === 'How much did the customer pay? ')
        return '200';
      else if (prompt === 'Can we keep the change as a tip? (y/N): ')
        return 'y';
    }

    jest.isolateModules ( () => require('../src/main') );

    expect(mockConsoleLog.mock.calls[1][0]).toBe('The total bill for all 3 items (including tax) is: $186.38');
    expect(mockConsoleLog.mock.calls[2][0]).toBe('Return $0 to the customer');
  });

  it('should detect insufficient payment', () => {
    mockPrompt = prompt => {
      if (prompt === '(Example: 99, 35, 34): ')
        return '100,50,25';
      else if (prompt === 'How much did the customer pay? ')
        return '150.0';
    }

    jest.isolateModules ( () => require('../src/main') );

    expect(mockConsoleLog.mock.calls[1][0]).toBe('The total bill for all 3 items (including tax) is: $186.38');
    expect(mockConsoleLog.mock.calls[2][0]).toBe('The customer needs to pay $36.38 more');
  });

  it('should detect exact payments', () => {
    mockPrompt = prompt => {
      if (prompt === '(Example: 99, 35, 34): ')
        return '100,50.0,25';
      else if (prompt === 'How much did the customer pay? ')
        return '186.38';
    }

    jest.isolateModules ( () => require('../src/main') );

    expect(mockConsoleLog.mock.calls[1][0]).toBe('The total bill for all 3 items (including tax) is: $186.38');
    expect(mockConsoleLog.mock.calls[2][0]).toBe('Exact payment! Nice!');
  });

});
