import { useState } from "react";
import { LContainer } from "./layout/LContainer";
import { LTopBar } from "./layout/LTopBar";
import { LWorkspace } from "./layout/LWorkspace";
import { PageItinerario } from "./pages/PageItinerario";
import { PageSobre } from "./pages/PageSobre";
import { TabKey } from "./components/Tabs";
import { PageMapa } from "./pages/PageMapa";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("itinerario");

  return (
    <LContainer>
      <LTopBar activeTab={activeTab} onTabChange={setActiveTab} />

      <LWorkspace>
        {activeTab === "itinerario" && <PageItinerario />}
        {activeTab === "mapa" && <PageMapa />}
        {activeTab === "sobre" && <PageSobre />}
      </LWorkspace>
    </LContainer>
  );
}
