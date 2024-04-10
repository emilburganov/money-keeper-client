import { AccountProvider } from "@/entities/account";
import { AuthProvider } from "@/entities/auth";
import { CategoryProvider } from "@/entities/category";
import { CurrencyProvider } from "@/entities/currency";
import { ExpenseProvider } from "@/entities/expense";
import { IncomeProvider } from "@/entities/income";
import { TransferProvider } from "@/entities/transfer";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

type WithChildren = { children: ReactNode };
type Provider = ({ children }: WithChildren) => ReactElement;

const compose = (...providers: Provider[]) => {
	return function Composed({ children }: WithChildren) {
		return (
			<>
				{providers.reduce((child, Element) => {
					return <Element>{child}</Element>;
				}, children)}
			</>
		);
	};
};

export const Providers = compose(
	ChakraProvider,
	AuthProvider,
	CurrencyProvider,
	AccountProvider,
	CategoryProvider,
	IncomeProvider,
	ExpenseProvider,
	TransferProvider,
);
