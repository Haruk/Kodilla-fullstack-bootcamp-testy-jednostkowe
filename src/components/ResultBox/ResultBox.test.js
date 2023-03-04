import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';


describe('Component ResultBox', () => {

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '500', from: 'PLN', to: 'USD' },
        ];
        for (const testObj of testCases) {
            render(<ResultBox from={`${testObj.from}`} to={`${testObj.to}`} amount={parseInt(testObj.amount)} />);
            const amountField = screen.getByTestId('container');
            expect(amountField).toHaveTextContent(`PLN ${parseInt(testObj.amount)}.00 = $${parseFloat((parseInt(testObj.amount) / 3.5).toFixed(2))}`);
            cleanup()
        }
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'USD', to: 'PLN' },
            { amount: '500', from: 'USD', to: 'PLN' },
        ];
        for (const testObj of testCases) {
            render(<ResultBox from={`${testObj.from}`} to={`${testObj.to}`} amount={parseInt(testObj.amount)} />);
            const amountField = screen.getByTestId('container');
            expect(amountField).toHaveTextContent(`$${parseInt(testObj.amount)}.00 = ${convertUSDToPLN(parseInt(testObj.amount))}`);
            cleanup()
        }
    });

    it('should render proper info about conversion when value forom and to are the same', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'USD' },
            { amount: '200', from: 'PLN', to: 'PLN' },
        ];
        for (const testObj of testCases) {
            render(<ResultBox from={`${testObj.from}`} to={`${testObj.to}`} amount={parseInt(testObj.amount)} />);
            const amountField = screen.getByTestId('container');
            expect(amountField).toHaveTextContent(`${testObj.from} ${testObj.amount} = ${testObj.to} ${testObj.amount}`);
            cleanup()
        }
    });

    it('should render proper info if value is less ten 0', () => {
        render(<ResultBox from={`PLN`} to={`USD`} amount={-100} />);
        const amountField = screen.getByTestId('container');
        expect(amountField).toHaveTextContent(`Wrong value...`);
        cleanup()

        render(<ResultBox from={`USD`} to={`PLN`} amount={-300} />);
        const amountField2 = screen.getByTestId('container');
        expect(amountField2).toHaveTextContent(`Wrong value...`);
    });
});