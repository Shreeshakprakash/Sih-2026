import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppShell } from "./components/AppShell";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import ClassificationIntelligence from "./pages/ClassificationIntelligence";
import Dashboard from "./pages/Dashboard";
import GISMap from "./pages/GISMap";
import HistoricalAnalysis from "./pages/HistoricalAnalysis";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import OSMContext from "./pages/OSMContext";
import RiskAlerts from "./pages/RiskAlerts";
import ThermalEvents from "./pages/ThermalEvents";
import ThermalEventIntelligence from "./pages/ThermalEventIntelligence";

function ConsoleRouter() {
  return <AppShell><Switch><Route path="/dashboard" component={Dashboard} /><Route path="/events" component={ThermalEvents} /><Route path="/event/:id" component={ThermalEventIntelligence} /><Route path="/map" component={GISMap} /><Route path="/history" component={HistoricalAnalysis} /><Route path="/analytics" component={Analytics} /><Route path="/risk-alerts" component={RiskAlerts} /><Route path="/osm-context" component={OSMContext} /><Route path="/classification" component={ClassificationIntelligence} /><Route path="/about" component={About} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></AppShell>;
}

function Router() {
  return <Switch><Route path="/" component={Landing} /><Route component={ConsoleRouter} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster theme="dark" /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
