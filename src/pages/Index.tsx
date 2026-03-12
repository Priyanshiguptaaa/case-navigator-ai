import { useState } from "react";
import { CaseSidebar } from "@/components/investigation/CaseSidebar";
import { CaseHeader } from "@/components/investigation/CaseHeader";
import { AgentStatusBar } from "@/components/investigation/AgentStatusBar";
import { IntelligenceSummary } from "@/components/investigation/IntelligenceSummary";
import { IssuesList } from "@/components/investigation/IssuesList";
import { CaseTimeline } from "@/components/investigation/CaseTimeline";
import { AIChat } from "@/components/investigation/AIChat";
import { EvidencePanel } from "@/components/investigation/EvidencePanel";
import { ActionBar } from "@/components/investigation/ActionBar";
import { EmptyWorkspace } from "@/components/investigation/EmptyWorkspace";

const Index = () => {
  const [activeCase, setActiveCase] = useState<string | null>(null);

  const handleNewInvestigation = (clientId: string) => {
    // Simulate loading a case — in production this would fetch from backend
    setActiveCase("new-" + clientId);
  };

  const handleSelectCase = (id: string) => {
    setActiveCase(id);
  };

  const hasActiveCase = activeCase !== null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <CaseSidebar
        activeCase={activeCase}
        onSelectCase={handleSelectCase}
        onNewInvestigation={handleNewInvestigation}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {hasActiveCase ? (
          <>
            <CaseHeader />
            <AgentStatusBar />

            <div className="flex-1 overflow-hidden flex">
              <div className="flex-1 overflow-y-auto p-5 space-y-4 min-w-0">
                <IntelligenceSummary />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <IssuesList />
                  <CaseTimeline />
                </div>
              </div>

              <div className="w-[400px] border-l border-border flex flex-col bg-card">
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex-[3] min-h-0">
                    <AIChat />
                  </div>
                  <div className="flex-[2] min-h-0 overflow-y-auto border-t border-border">
                    <EvidencePanel />
                  </div>
                </div>
              </div>
            </div>

            <ActionBar />
          </>
        ) : (
          <EmptyWorkspace onNewInvestigation={handleNewInvestigation} />
        )}
      </div>
    </div>
  );
};

export default Index;
