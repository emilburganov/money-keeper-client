import { useAuthStore } from "@/entities/auth";
import { ROUTE_CONSTANTS } from "@/shared/config";
import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const LoginPage = lazy(() => import("./(auth)/login"));
const RegistrationPage = lazy(() => import("./(auth)/registration"));
const CategoriesPage = lazy(() => import("./(category)/categories"));
const IncomesPage = lazy(() => import("./(income)/incomes"));
const ExpensesPage = lazy(() => import("./(expense)/expenses"));
const AccountsPage = lazy(() => import("./(account)/accounts"));

export const Routing = observer(() => {
	const { isAuth } = useAuthStore();

	return (
		<Routes>
			{!isAuth ? (
				<>
					<Route path={ROUTE_CONSTANTS.HOME} element={<HomePage />} />
					<Route path={ROUTE_CONSTANTS.LOGIN} element={<LoginPage />} />
					<Route
						path={ROUTE_CONSTANTS.REGISTRATION}
						element={<RegistrationPage />}
					/>
					<Route path="*" element={<HomePage />} />
				</>
			) : (
				<>
					<Route
						path={ROUTE_CONSTANTS.CATEGORIES}
						element={<CategoriesPage />}
					/>
					<Route path={ROUTE_CONSTANTS.INCOMES} element={<IncomesPage />} />
					<Route path={ROUTE_CONSTANTS.EXPENSES} element={<ExpensesPage />} />
					<Route path={ROUTE_CONSTANTS.ACCOUNTS} element={<AccountsPage />} />
					<Route path="*" element={<AccountsPage />} />
				</>
			)}
		</Routes>
	);
});
