import DisclaimerComponent from "@/components/DisclaimerComponent";
import TitleComponent from "@/components/TitleComponent";
import { DISCLAIMER_TEXT, TITLE_TEXT } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-8 items-center">
      <TitleComponent description="This is a test site. Please do not take this site seriously">
        {TITLE_TEXT}
      </TitleComponent>
      <DisclaimerComponent>{DISCLAIMER_TEXT}</DisclaimerComponent>
    </div>
  );
}
