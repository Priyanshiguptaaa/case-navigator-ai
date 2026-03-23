import { useState } from "react";
import { CaseSidebar, type ViewMode } from "@/components/investigation/CaseSidebar";
import { CaseHeader } from "@/components/investigation/CaseHeader";
import { IntelligenceSummary } from "@/components/investigation/IntelligenceSummary";
import { IssuesList } from "@/components/investigation/IssuesList";
import { CaseTimeline } from "@/components/investigation/CaseTimeline";
import { AIChat } from "@/components/investigation/AIChat";
import { ActionBar } from "@/components/investigation/ActionBar";
import { EmptyWorkspace } from "@/components/investigation/EmptyWorkspace";
import { ExecChat } from "@/components/investigation/ExecChat";

const Index = () => {
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("client");

  const handleNewInvestigation = (clientId: string) => {
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
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {viewMode === "exec" ? (
          <ExecChat />
        ) : hasActiveCase ? (
          <>
            <CaseHeader />

            <div className="flex-1 overflow-hidden flex">
              <div className="flex-1 overflow-y-auto p-5 space-y-4 min-w-0">
                <IntelligenceSummary />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <IssuesList />
                  <CaseTimeline />
                </div>
              </div>

              <div className="w-[400px] border-l border-border flex flex-col bg-card">
                <AIChat />
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
