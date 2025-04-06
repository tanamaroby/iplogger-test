import DisclaimerComponent from "@/components/DisclaimerComponent";
import IpAddressGrabComponent from "@/components/IpAddressGrabComponent";
import TitleComponent from "@/components/TitleComponent";
import { DISCLAIMER_TEXT, TITLE_TEXT } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-6 items-center">
      <TitleComponent description="This is a test site. Please do not take this site seriously">
        {TITLE_TEXT}
      </TitleComponent>
      <DisclaimerComponent>{DISCLAIMER_TEXT}</DisclaimerComponent>
      <div className="text-center container mx-auto space-y-4">
        <p>
          This website will try and fetch your geographical location using your
          IP address.
        </p>
        <p className="text-center">
          Not to worry, the location will not be stored anywhere. It is
          primarily used for me to practice data fetching and IP address
          location, and then displaying it onto the site. It is also used to
          test the use of <code>Playwright</code> testing suite, and other
          libraries that I find interesting.
        </p>
      </div>
      <IpAddressGrabComponent />
    </div>
  );
}
