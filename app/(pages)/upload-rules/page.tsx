"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "../../components/layout/Header";
import { toast } from "sonner";

const UploadRulesPage = () => {
  const [htmlContent, setHtmlContent] = useState(`Pilot shall also advise the Guard through walkie-talkie of all the documents handed over to him with regard to the working of trains. The information received should be recorded by the Guard in the rough journal and combined train report.</p>
        </div>
    </section>

    <!-- Rule 4.02 -->
    <section id="4.02">
        <div>
            <p>No passenger train or mixed train shall be despatched from a station before the advertised time.</p>
        </div>
    </section>

    <!-- Rule 4.03 -->
    <section id="4.03">
        <div>
            <p>Before a train starts from a terminal or crew-changing station, the Guard shall set his watch by the station clock or the clock at the authorised place of reporting for duty and communicate the time to the Loco Pilot who shall set his watch accordingly.</p>
        </div>
    </section>

    <!-- Rule 4.04 -->
    <section id="4.04">
        <div>
            <p>Every Guard, Loco Pilot, Assistant Loco Pilot shall be in attendance for duty at such place and at such time as may be prescribed by special instructions.</p>
            <p>S.R.4.04(i) Guards and Assistant Guards of Express, Mail and Passenger trains shall appear on duty thirty minutes before the booked departure of the trains, Guards and Assistant Guards of road vans, Mixed, Goods and Departmental trains, also shall appear on duty thirty minutes before the booked or notified departure of the trains.</p>
            <p>S.R.4.04(ii) When Guards and Brakesmen report for or break off duty, they shall sign in the Guards "On" and "Off" duty Register entering the time.</p>
        </div>
    </section>

    <!-- Rule 4.05 -->
    <section id="4.05">
        <div>
            <p>The Loco Pilot shall take his train along the proper running line.</p>
            <p>S.R.4.05(i) Except as provided for in the Station Working Rules, the berthing of a train on a non-running line for crossing purposes is prohibited. However, light engines may, after being received into the station on a running line in the usual manner, be shunted on to and berthed on a non-running line whenever necessary, without any special instructions. When a light engine is so berthed on a non-running line, it shall not be reckoned as a crossing train for the purpose of computing the number of trains to be crossed at the station.</p>
            <p>S.R.4.05(ii)(a) The Goods Home signal shall not be taken 'Off' for a train carrying passengers. If so, the Loco Pilot of a passenger train shall stop short of the Goods Home signal, inform the Guard and send his Assistant Loco Pilot to the station to inform the Station Master. The Station Master shall put back the Goods Home signal to 'On' and take 'Off' the Passenger Home signal and give a memo to the Loco Pilot (countersigned by the Guard) authorizing the Loco Pilot to enter the station observing the 'Off' aspect of the Passenger Home signal. In such cases, the Guard shall send a special report to the Divisional Operations Manager along with the Combined Train Report.</p>
            <p>S.R.4.05(ii)(b) A goods train may be received either into the Coaching or Goods yard by taking 'Off' relevant signals according to operational convenience.</p>
        </div>
    </section>

    <!-- Rule 4.06 -->
    <section id="4.06">
        <div>
            <p>(1) On a double line, every train shall run on the left hand line unless otherwise prescribed by special instructions.</p>
            <p>(2) If there are two or more parallel lines, the direction in which trains are to run on each line shall be prescribed by special instructions.</p>
            <p>S.R.4.06(i) The Up and Down direction of traffic on the various sections are given in the Working Time Table.</p>
        </div>
    </section>

    <!-- Rule 4.07 -->
    <section id="4.07">
        <div>
            <p>(1) A copy of the Working Time Table for the time being in force shall be supplied to each station, Guard, Loco Pilot, Inspector of Way or Works, and any other railway servant requiring the use of the Working Time Table during the course of his duties.</p>
            <p>(2) A copy of the Working Time Table shall, on issue, be supplied to the Commissioner of Railway Safety.</p>
            <p>(3) A copy of the Schedule of Standard Dimensions for the time being in force shall be supplied to each Inspector of Way or Works and Train Examiner.</p>
        </div>
    </section>

    <h3>B. Speed of Trains</h3>

    <!-- Rule 4.08 -->
    <section id="4.08">
        <div>
            <p>(1) (a) Every train shall be run on each section of the railway within the limits of speed sanctioned for that section by special instructions.</p>
            <p>(Ref:- Railway Board's letter No. 2022/Safety(A&R)/19/20 dated 27.07.22) (Correction Memo 03/2022 dated 12.08.2022)</p>
            <p>(b) The sectional speed sanctioned and permanent speed restrictions shall be shown in the Working Time Table.</p>
            <p>(c) The Loco Pilot shall observe the sanctioned sectional speed except when either one speedometer in case of electric loco or two speedometers in case of other locomotives are defective. In such cases of defective speedometers both the maximum permissible speed and booked speed of coaching trains shall be reduced by ten per cent from the speed otherwise permissible.</p>
            <p>(2) The Loco Pilot shall:- (a) regulate and control the running of the train according to the Working Time Table, so as to avoid either excessive speed or loss of time, and (b) not make up between any two stations more time than is allowed in this behalf in the Working Time Table, and shall also observe all speed restrictions.</p>
            <p>(3) When it is necessary to indicate to the Loco Pilot where trains are to run at a restricted speed or where trains have to come to a stop due to the line being under repairs or due to any other obstruction, action shall be taken as specified in Rule 15.09.</p>
            <p>S.R. 4.08(i) No locomotive shall be turned out from the shed with deficient or defective speedometer. In case, the speedometer becomes defective enroute, the Loco Pilot shall work the train at speed 10% less than the permissible speed by estimating the speed with the help of his watch, kilometre posts and inter-station running time given in the Working Time Table.</p>
            <p>S.R. 4.08(ii) The Maximum permissible speed of Goods trains and Mixed Trains in Broad Gauge is 75 kmph except in case of trains with rolling stock where a higher speed is permitted as indicated in the Working Time Table.</p>
            <p>(Correction Memo No.04/2015 dated 28.08.15)</p>
        </div>
    </section>

    <!-- Rule 4.09 -->
    <section id="4.09">
        <div>
            <p>(1) Whenever, in consequence of the line being under repair or for any other reason, special precautions are necessary, a Caution Order detailing the kilometres between which such precautions are necessary, the reasons for taking such precautions, and the speed at which a train shall travel, shall be handed over to the Loco Pilot at the stopping station immediately short of the place where such precautions are necessary, or at such other stations, and in such manner, as prescribed under special instructions.</p>
            <p>(2) Sub-rule (1) does not apply in the case of long continued repairs when fixed signals are provided at an adequate distance short of such place and have been notified to the running staff concerned.</p>
            <p>(3) The Caution Order referred to in sub-rule (1) shall be on white paper, with green font and be made out and signed in full.</p>
        </div>
    </section>`);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!htmlContent.trim()) {
      toast.error("Please paste HTML content");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/upload-rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setHtmlContent("");
      } else {
        toast.error(result.error || 'Upload failed');
      }
    } catch (error) {
      toast.error('Failed to upload rules');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload Rules HTML Content</h1>
          
          <div className="space-y-4">
            <Textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Paste HTML content here..."
              className="min-h-[400px]"
            />
            
            <div className="flex gap-4">
              <Button 
                onClick={handleUpload}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Uploading..." : "Upload to Database"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setHtmlContent("")}
                disabled={loading}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadRulesPage;