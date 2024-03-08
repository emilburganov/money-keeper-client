import { Routing } from "@/pages";
import "@/shared/i18n";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { createStandaloneToast } from "@chakra-ui/react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Providers } from "./providers";

const { ToastContainer } = createStandaloneToast();

const App = () => {
	return (
		<Providers>
			<ToastContainer />
			<BrowserRouter>
				<Header />
				<Suspense fallback={<Spinner />}>
					<Routing />
				</Suspense>
				<Footer />
			</BrowserRouter>
		</Providers>
	);
};

export default App;
