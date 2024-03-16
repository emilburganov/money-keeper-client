import { useAuthStore } from "@/entities/auth";
import { ROUTE_CONSTANTS } from "@/shared/config";
import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const LoginPage = lazy(() => import("./login"));
const RegistrationPage = lazy(() => import("./registration"));
const CategoriesPage = lazy(() => import("./categories"));
const IncomesPage = lazy(() => import("./incomes"));
const ExpensesPage = lazy(() => import("./expenses"));
const AccountsPage = lazy(() => import("./accounts"));
const TransfersPage = lazy(() => import("./transfers"));
const ProfilePage = lazy(() => import("./profile"));

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
					<Route path={ROUTE_CONSTANTS.TRANSFERS} element={<TransfersPage />} />
					<Route path={ROUTE_CONSTANTS.PROFILE} element={<ProfilePage />} />
					<Route path="*" element={<AccountsPage />} />
				</>
			)}
		</Routes>
	);
});
