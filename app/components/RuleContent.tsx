import { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface RuleReference {
  text: string;
  reference: string;
  description: string;
}

interface RuleContentProps {
  searchQuery?: string;
}

export function RuleContent({ searchQuery }: RuleContentProps) {
  const [highlightedReference, setHighlightedReference] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  const handleReferenceClick = (ref: RuleReference) => {
    setHighlightedReference(ref.reference);

    // Navigate to reference page with state
    navigate("/reference", {
      state: {
        reference: ref.reference,
        description: ref.description,
      },
    });

    // Auto-dismiss highlight after 3 seconds
    setTimeout(() => setHighlightedReference(null), 3000);
  };

  const highlightSearchTerm = (text: string, searchTerm?: string) => {
    if (!searchTerm) return text;

    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-foreground">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const renderReference = (ref: RuleReference, index: number) => (
    <button
      key={index}
      onClick={() => handleReferenceClick(ref)}
      className="text-reference hover:underline font-medium inline-flex items-center gap-1 transition-colors"
    >
      {ref.text}
      <ExternalLink className="h-3 w-3" />
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-document-bg">
      {/* Chapter Header */}
      <div className="text-center py-12 border-b border-document-border mb-12">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Working of Trains Generally
          </p>
          <h1 className="text-3xl font-bold text-chapter tracking-tight">
            CHAPTER IV
          </h1>
          <h2 className="text-2xl font-semibold text-chapter">
            WORKING OF TRAINS GENERALLY
          </h2>
          <h3 className="text-lg font-medium text-foreground mt-6">
            A. Timing and Running of Trains
          </h3>
        </div>
      </div>

      {/* Rules Content */}
      <div className="space-y-12 text-sm leading-relaxed px-6">
        {/* Rule 4.01 */}
        <section id="4.01" className="scroll-mt-20">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.01.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Standard time:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              {highlightSearchTerm(
                "The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which shall be transmitted daily to all the principal stations of the railway at 16.00 hours in the manner prescribed.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "S.R.4.01 'Standard time' as referred in GR 4.01 shall be the time displayed in GPS clock provided in the Control office and shall be transmitted to all stations at 16.00 hours by the section Controller.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "For stations, which are not connected to the control, the specified stations shall pass on this information through telephone.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                'At all class "D" stations where there is no telephone connections either with the adjacent station or Control, the Clerk-in-charge shall check their station clocks daily with the time of the Guard of the first stopping train for the day.',
                searchQuery
              )}
            </p>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                (Ref: Railway Board letter No. ED/Safety-II/Rly Board letter
                No.2020/ Safety(A&R)/ 19/09 dated 28.07.2021)
                <span className="ml-2 text-xs">
                  (Correction Memo 03/2021 dated 25.08.2021)
                </span>
              </p>
            </div>
          </div>
          {/* S.R.4.50 (ii) and (iii) - Whistle boards and walkie-talkie communication */}
          <div className="ml-16 space-y-6 text-justify mt-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                S.R. 4.50 (ii) Whistle boards and whistling at obstructions
              </h4>
              <div className="space-y-4">
                <p>
                  {highlightSearchTerm(
                    "(1) Loco Pilots shall constantly whistle when approaching and entering tunnels, curves and cuttings where the view ahead is obstructed. They shall also act likewise when crossing a train at a station and when approaching all other places where obstructions are likely to occur. (Correction Memo No. 4 / 2010 dated 10.06.2010)",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(2) Whistle boards are of two kinds. They are whistle boards with the letter 'W/L' and whistle boards with the letter 'W'.",
                    searchQuery
                  )}
                </p>
                <div className="space-y-3 ml-4">
                  <p>
                    <span className="font-semibold text-foreground">
                      (3)(i)
                    </span>{" "}
                    {highlightSearchTerm(
                      "Whistle boards with the letter 'W/L' are provided: (a) on the approaches of all the unmanned level crossings, and (b) on the approaches of manned level crossings inside or outside station limits where a clear view of the line from the level crossing is not available. Loco Pilots of approaching trains on noticing the 'W/L' whistle board shall sound intermittent long whistles from the time they approach the whistle board till they pass the relevant level crossing. (Correction Memo No. 4 / 2010 dated 10.06.2010)",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">(ii)</span>{" "}
                    {highlightSearchTerm(
                      "Whistle boards with the letter 'W' are provided in rear of all places where the view of the track is obstructed by curves, cuttings or tunnels. Loco Pilots of approaching trains on noticing these whistle boards shall sound their engine whistle continuously from the time they approach a whistle board till they get clear view of the track ahead.",
                      searchQuery
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                S.R. 4.50 (iii) Use of walkie-talkie along with whistle
              </h4>
              <div className="space-y-3">
                <p>
                  {highlightSearchTerm(
                    "The Loco Pilot shall communicate through walkie-talkie sets in addition to the sounding of the engine whistle as prescribed in S.R. 4.50 (i).",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "The Loco Pilot shall also advise the Guard through walkie-talkie of all the documents handed over to him with regard to the working of trains. The information received should be recorded by the Guard in the rough journal and combined train report.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.02 */}
        <section id="4.02" className="scroll-mt-20">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.02.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Adherence to advertised time
            </h3>
          </div>

          <div className="ml-16">
            <p className="text-justify">
              {highlightSearchTerm(
                "No passenger train or mixed train shall be despatched from a station before the advertised time.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.03 */}
        <section id="4.03" className="scroll-mt-20">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.03.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Setting watch:-
            </h3>
          </div>

          <div className="ml-16">
            <p className="text-justify">
              {highlightSearchTerm(
                "Before a train starts from a terminal or crew-changing station, the Guard shall set his watch by the station clock or the clock at the authorised place of reporting for duty and communicate the time to the Loco Pilot who shall set his watch accordingly.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.04 */}
        <section id="4.04" className="scroll-mt-20">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.04.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Time of attendance for train crew:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Definition of departmental train as per{" "}
                {renderReference(
                  {
                    text: "Para 843 of IRPWM",
                    reference: "Para 843 of IRPWM",
                    description:
                      "Indian Railway Permanent Way Manual - Rules regarding departmental trains and their operation procedures.",
                  },
                  0
                )}
              </p>
            </div>

            <p>
              {highlightSearchTerm(
                "Every Guard, Loco Pilot, Assistant Loco Pilot shall be in attendance for duty at such place and at such time as may be prescribed by special instructions.",
                searchQuery
              )}
            </p>

            <div className="flex items-start space-x-2 mt-2">
              <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                As per{" "}
                {renderReference(
                  {
                    text: "Para 843 of IRPWM",
                    reference: "Para 843 of IRPWM",
                    description:
                      "Specific regulations for train crew attendance and reporting procedures as defined in the Indian Railway Permanent Way Manual.",
                  },
                  1
                )}
              </p>
            </div>

            <p className="mt-4">
              {highlightSearchTerm(
                "S.R.4.04(i) Guards and Assistant Guards of Express, Mail and Passenger trains shall appear on duty thirty minutes before the booked departure of the trains, Guards and Assistant Guards of road vans, Mixed, Goods and Departmental trains, also shall appear on duty thirty minutes before the booked or notified departure of the trains.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                'S.R.4.04(ii) When Guards and Brakesmen report for or break off duty, they shall sign in the Guards "On" and "Off" duty Register entering the time.',
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.05 */}
        <section id="4.05" className="scroll-mt-20">
          <div className="flex items-start space-x-4 mb-4">
            <span className="text-rule font-bold text-base min-w-fit">
              4.05.
            </span>
            <h3 className="font-semibold text-base text-foreground">
              Proper running line:-
            </h3>
          </div>

          <div className="ml-12">
            <p className="text-justify">
              {highlightSearchTerm(
                "The Loco Pilot shall take his train along the proper running line.",
                searchQuery
              )}
            </p>

            <div className="space-y-4 mt-4 text-justify">
              <p>
                {highlightSearchTerm(
                  "S.R.4.05(i) Except as provided for in the Station Working Rules, the berthing of a train on a non-running line for crossing purposes is prohibited. However, light engines may, after being received into the station on a running line in the usual manner, be shunted on to and berthed on a non-running line whenever necessary, without any special instructions. When a light engine is so berthed on a non-running line, it shall not be reckoned as a crossing train for the purpose of computing the number of trains to be crossed at the station.",
                  searchQuery
                )}
              </p>

              <p>
                {highlightSearchTerm(
                  "S.R.4.05(ii)(a) The Goods Home signal shall not be taken 'Off' for a train carrying passengers. If so, the Loco Pilot of a passenger train shall stop short of the Goods Home signal, inform the Guard and send his Assistant Loco Pilot to the station to inform the Station Master. The Station Master shall put back the Goods Home signal to 'On' and take 'Off' the Passenger Home signal and give a memo to the Loco Pilot (countersigned by the Guard) authorizing the Loco Pilot to enter the station observing the 'Off' aspect of the Passenger Home signal. In such cases, the Guard shall send a special report to the Divisional Operations Manager along with the Combined Train Report.",
                  searchQuery
                )}
              </p>

              <p>
                {highlightSearchTerm(
                  "S.R.4.05(ii)(b) A goods train may be received either into the Coaching or Goods yard by taking 'Off' relevant signals according to operational convenience.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.06 */}
        <section id="4.06" className="scroll-mt-20">
          <div className="flex items-start space-x-4 mb-4 mt-6">
            <span className="text-rule font-bold text-base min-w-fit">
              4.06.
            </span>
            <h3 className="font-semibold text-base text-foreground">
              Direction of running:-
            </h3>
          </div>
          <div className="ml-12 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) On a double line, every train shall run on the left hand line unless otherwise prescribed by special instructions.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) If there are two or more parallel lines, the direction in which trains are to run on each line shall be prescribed by special instructions.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "S.R.4.06(i) The Up and Down direction of traffic on the various sections are given in the Working Time Table.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.07 */}
        <section id="4.07" className="scroll-mt-20">
          <div className="flex items-start space-x-4 mb-4 mt-6">
            <span className="text-rule font-bold text-base min-w-fit">
              4.07.
            </span>
            <h3 className="font-semibold text-base text-foreground">
              Supply of Working Time Table and Schedule of Standard Dimensions:-
            </h3>
          </div>
          <div className="ml-12 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) A copy of the Working Time Table for the time being in force shall be supplied to each station, Guard, Loco Pilot, Inspector of Way or Works, and any other railway servant requiring the use of the Working Time Table during the course of his duties.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) A copy of the Working Time Table shall, on issue, be supplied to the Commissioner of Railway Safety.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(3) A copy of the Schedule of Standard Dimensions for the time being in force shall be supplied to each Inspector of Way or Works and Train Examiner.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Sub-section Header: B. Speed of Trains */}
        <div className="pt-8 mt-8 border-t border-document-border">
          <h3 className="text-xl font-semibold text-foreground">
            B. Speed of Trains
          </h3>
        </div>

        {/* Rule 4.08 */}
        <section id="4.08" className="scroll-mt-20">
          <div className="flex items-start space-x-4 mb-4 mt-4">
            <span className="text-rule font-bold text-base min-w-fit">
              4.08.
            </span>
            <h3 className="font-semibold text-base text-foreground">
              Limits of speed generally:-
            </h3>
          </div>
          <div className="ml-12 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) (a) Every train shall be run on each section of the railway within the limits of speed sanctioned for that section by special instructions.",
                searchQuery
              )}
            </p>
            <div className="text-xs text-muted-foreground p-3 bg-muted rounded border-l-4 border-primary">
              <p>
                {highlightSearchTerm(
                  "(Ref:- Railway Board's letter No. 2022/Safety(A&R)/19/20 dated 27.07.22) (Correction Memo 03/2022 dated 12.08.2022)",
                  searchQuery
                )}
              </p>
            </div>
            <p>
              {highlightSearchTerm(
                "(b) The sectional speed sanctioned and permanent speed restrictions shall be shown in the Working Time Table.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(c) The Loco Pilot shall observe the sanctioned sectional speed except when either one speedometer in case of electric loco or two speedometers in case of other locomotives are defective. In such cases of defective speedometers both the maximum permissible speed and booked speed of coaching trains shall be reduced by ten per cent from the speed otherwise permissible.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) The Loco Pilot shall:- (a) regulate and control the running of the train according to the Working Time Table, so as to avoid either excessive speed or loss of time, and (b) not make up between any two stations more time than is allowed in this behalf in the Working Time Table, and shall also observe all speed restrictions.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(3) When it is necessary to indicate to the Loco Pilot where trains are to run at a restricted speed or where trains have to come to a stop due to the line being under repairs or due to any other obstruction, action shall be taken as specified in Rule 15.09.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "S.R. 4.08(i) No locomotive shall be turned out from the shed with deficient or defective speedometer. In case, the speedometer becomes defective enroute, the Loco Pilot shall work the train at speed 10% less than the permissible speed by estimating the speed with the help of his watch, kilometre posts and inter-station running time given in the Working Time Table.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "S.R. 4.08(ii) The Maximum permissible speed of Goods trains and Mixed Trains in Broad Gauge is 75 kmph except in case of trains with rolling stock where a higher speed is permitted as indicated in the Working Time Table.",
                searchQuery
              )}
            </p>
            <div className="text-xs text-muted-foreground p-3 bg-muted rounded border-l-4 border-primary">
              <p>
                {highlightSearchTerm(
                  "(Correction Memo No.04/2015 dated 28.08.15)",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.09 */}
        <section id="4.09" className="scroll-mt-20">
          <div className="flex items-start space-x-4 mb-4 mt-4">
            <span className="text-rule font-bold text-base min-w-fit">
              4.09.
            </span>
            <h3 className="font-semibold text-base text-foreground">
              Caution order:-
            </h3>
          </div>
          <div className="ml-12 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) Whenever, in consequence of the line being under repair or for any other reason, special precautions are necessary, a Caution Order detailing the kilometres between which such precautions are necessary, the reasons for taking such precautions, and the speed at which a train shall travel, shall be handed over to the Loco Pilot at the stopping station immediately short of the place where such precautions are necessary, or at such other stations, and in such manner, as prescribed under special instructions.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) Sub-rule (1) does not apply in the case of long continued repairs when fixed signals are provided at an adequate distance short of such place and have been notified to the running staff concerned.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "(3) The Caution Order referred to in sub-rule (1) shall be on white paper, with green font and be made out and signed in full.",
                searchQuery
              )}
            </p>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  As per{" "}
                  {renderReference(
                    {
                      text: "Para 814(1)(a) of IRPWM",
                      reference: "Para 814(1)(a) of IRPWM",
                      description:
                        "Guidelines for issuing caution orders and protection during works.",
                    },
                    2
                  )}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  As per{" "}
                  {renderReference(
                    {
                      text: "Para 814(3) of IRPWM",
                      reference: "Para 814(3) of IRPWM",
                      description:
                        "Conditions when long-duration works are protected by fixed signals.",
                    },
                    3
                  )}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  As per{" "}
                  {renderReference(
                    {
                      text: "Para 806 of IRPWM",
                      reference: "Para 806 of IRPWM",
                      description:
                        "Speed restrictions and protection for works on track.",
                    },
                    4
                  )}{" "}
                  {highlightSearchTerm("and", searchQuery)}{" "}
                  {renderReference(
                    {
                      text: "Para 807 of IRPWM",
                      reference: "Para 807 of IRPWM",
                      description:
                        "Details of caution indicators and their placement.",
                    },
                    5
                  )}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  {highlightSearchTerm(
                    "Speed of material trains as per",
                    searchQuery
                  )}{" "}
                  {renderReference(
                    {
                      text: "Para 857 of IRPWM",
                      reference: "Para 857 of IRPWM",
                      description:
                        "Permissible speeds and working of material trains.",
                    },
                    6
                  )}
                </p>
              </div>
            </div>

            {/* S.R.4.09(i) Issue of Caution Orders */}
            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-6 text-lg">
                S.R.4.09 (i) ISSUE OF CAUTION ORDERS
              </h4>
              <div className="overflow-x-auto">
                <Table className="text-[13px] border border-border rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Circumstance</TableHead>
                      <TableHead>Particulars of caution</TableHead>
                      <TableHead className="min-w-[180px]">Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center align-top">1</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When a token of the Block section is extracted in connection with the work involving disconnection of points at the outlying siding.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Token handed over to Signal & Telecommunication department official for disconnection of points at the outlying siding. 'Observe special caution as necessary and lookout for hand signals at site'.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Para No. 4.15 (xxvi) of BWM Part 1",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 1118 of IRPWM",
                              reference: "Para 1118 of IRPWM",
                              description:
                                "Caution orders during block token extraction and works at outlying sidings.",
                            },
                            7
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">2</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Whenever Loco Pilots report about slack or rough running or heavy lurch or any abnormal condition in the track over which his train has passed.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Loco Pilot's message shall be repeated and the clause, 'Observe Special Caution, reduce speed as necessary and do not in any case, exceed a speed of 10 KMPH and stop dead sufficiently short of the affected portion of the track before taking necessary action' to be added.",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-2">
                          {highlightSearchTerm(
                            "Note: The Loco Pilot of the first train entering into the Block section shall stop at the spot indicated in the caution order, inspect the track and follow the instructions contained in SR.6.07(i) (d) and (e) (Correction Memo No. 2 / 2008 dated 09.06.2008)",
                            searchQuery
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "SR.6.07(i) (d) and (e)",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 1118 of IRPWM",
                              reference: "Para 1118 of IRPWM",
                              description:
                                "Instructions for first train and detailed caution order actions.",
                            },
                            8
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">3</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When unsafe condition of the bunds of tanks or rivers is reported, and where danger is suspected to the Railway track, bridges and other fixed installations from sabotage, and the location remaining vague.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Particulars of the river or tank bund reported to be unsafe/information regarding danger apprehended from sabotage, shall be given and add 'Observe special caution. Do not in any case exceed a speed of 15 KMPH during day and clear weather and 10 KMPH during night or when the view ahead is not clear'.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "SR.6.07 (iv) (Correction memo No.02/2008 dated 09.06.2008)",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 1128, 1115 of IRPWM",
                              reference: "Para 1128 & 1115 of IRPWM",
                              description:
                                "Protection and speed when floods or sabotage are suspected.",
                            },
                            9
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">4</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When water reaches danger level mark at bridges.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "'Water reached " +
                            '"danger"' +
                            " level mark at bridge No. --------- at KM -------- between -------- station and -------- station. Proceed cautiously and observe engineering hand signals at site. Speed shall not exceed 15 KMPH during day and clear weather and 10 KMPH during night or when the view ahead is not clear'.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "SR.15.05 (10) (Correction memo No. 9 dated 20.02.07)",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 706 of IRBM",
                              reference: "Para 706 of IRBM",
                              description:
                                "Bridge water level danger mark procedures.",
                            },
                            10
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">5</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When Trolley is on line under caution order protection on form T/1518.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Trolley on line caution order T/C 409 to be issued.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "SR.15.24 (i) a & b.",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 837(4)(i) of IRPWM",
                              reference: "Para 837(4)(i) of IRPWM",
                              description:
                                "Trolley working under protection and related caution order.",
                            },
                            11
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-8">
              <div className="overflow-x-auto">
                <Table className="text-[13px] border border-border rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Circumstance</TableHead>
                      <TableHead>Particulars of caution</TableHead>
                      <TableHead className="min-w-[180px]">Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center align-top">6</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "If the gateman's acknowledgement of a non-interlocked level crossing gate (outside the First stop signals of the station) provided with communications, is not received for a train to enter the block section from either end.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Gateman's acknowledgement has not been received. Location of the level crossing shall be notified.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "SR.16.03 (iii) (b).",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">7</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "For the last train mentioned in the line block order to enter the block section before imposition of line block.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Lookout for a stop hand signal from the engineering official incharge at KMs for the issue of Last Train Certificate.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("S.R.15.06(18)(7).", searchQuery)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">8</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "For traffic train to enter a block section on the expiry of Line Block period when the Line Block 'Removal Advice' or the Line Block 'Extension Advice' has not been received from the engineering official-in-charge.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Line Block Removal/Extension Advice not received. Be prepared for stop or caution signals at km-------------",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S.R.15.06(18)8(d)(ii).",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">9</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When any patrolman does not report within 15 minutes of his scheduled arrival.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Beat No. -----------------------Patrolman between -----------------station and ---------------------station who was due to arrive at ------------station at ----------------hours has not arrived yet. Restrict the speed to 40 KMPH during day when visibility is clear & 15 KMPH during night and during day when the visibility is poor.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("S.R 15.05 7c(i).", searchQuery)}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 1004 (4) of IRPWM",
                              reference: "Para 1004(4) of IRPWM",
                              description:
                                "Patrolman reporting and protection provisions.",
                            },
                            12
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        10
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "On Twin Single line sections when line clear is obtained for a train by any means of communication other than the Block Instrument / Track Circuit / Axle Counter or Telephone attached to Block Instrument duly cross checking the private numbers given for Line clear for the preceding three trains.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "The speed of first train shall not exceed 25 kmph over the entire section",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S. R 14.01 (ii) (c) (Correction Memo No. 6 dated 20.10.07)",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        11
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When there is a doubt or suspicion from the condition of a run through train or observations made that the block section in rear might have been obstructed or affected during the passage of train.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Proceed cautiously and lookout for any obstruction on the line.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Part I Chapter III 1.3.3(d) of BWM",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 1118 of IRPWM",
                              reference: "Para 1118 of IRPWM",
                              description:
                                "Doubt/suspicion of obstruction procedures.",
                            },
                            13
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        12
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When engineering Gate signal is reported as defective.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Information about the failure of gate signal notifying its location shall be given.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("S.R. 16.06(ii) b.", searchQuery)}
                        <div className="text-xs text-muted-foreground mt-1">
                          {renderReference(
                            {
                              text: "Annexure 7.1 of IRTMM",
                              reference: "Annexure 7.1 of IRTMM",
                              description:
                                "Gate signal failure reporting format/details.",
                            },
                            14
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        13
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Engineering works or repairs on the track.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "T/409 or T/B 409 shall be issued. Details, as per the contents of the caution order advice of the engineering official.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("SR. 16.06(ii) b.", searchQuery)}
                        <div className="text-xs text-muted-foreground mt-1">
                          As per{" "}
                          {renderReference(
                            {
                              text: "Para 810(4) of IRPWM",
                              reference: "Para 810(4) of IRPWM",
                              description:
                                "Engineering works/repairs protection and T/409 details.",
                            },
                            15
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            {/* Third table (items 23–28) as per reference page */}
            <div className="mt-8">
              <div className="overflow-x-auto">
                <Table className="text-[13px] border border-border rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Circumstance</TableHead>
                      <TableHead>Particulars of caution</TableHead>
                      <TableHead className="min-w-[180px]">Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        23
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When a train has to be started after the occurrence of train parting and the clearance of obstruction.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          '"Report on the conditions of the track such as misalignment or distortion if any due to parting of previous train, to the Station Master at the other end.',
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          {highlightSearchTerm(
                            "As per Para 118 (6) of IRPWM",
                            searchQuery
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "G.R. 6.04(i). S.R. 6.08(vii).",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        24
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When trains hauled by steam/Diesel locomotives are permitted to enter the section during Power Block period.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          '"Power Block in force between -------------- and----------------------station. The speed restriction and/or special precautions if any to be observed as per the advice of Traction Power Controller to be included.',
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S.R. 17.02(iv) S.R. 4.09 (iii)(7)",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        25
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "During temporary single line working on a double line section worked under the Automatic Block System.",
                          searchQuery
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          {highlightSearchTerm(
                            "The existing S.No 25 deleted vide Correction Memo No.04/2019 dated 18.11.2019",
                            searchQuery
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top space-y-2">
                        <div>
                          {highlightSearchTerm(
                            "a) The speed of the first train, in both the right direction and the wrong direction is restricted to 25 kmph.",
                            searchQuery
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {highlightSearchTerm(
                            "(Correction Memo 02/2022 dated 12.05.2022)",
                            searchQuery
                          )}
                        </div>
                        <div>
                          {highlightSearchTerm(
                            "b) An endorsement to the Loco Pilot of the first train in the wrong direction to inform all gatemen and gangmen on the way about the introduction of temporary single line working.",
                            searchQuery
                          )}
                        </div>
                        <div>
                          {highlightSearchTerm(
                            "c) Caution order shall contain:",
                            searchQuery
                          )}
                        </div>
                        <div className="pl-4 space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "1. the line on which to run.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "2. the kilometrage between which the obstruction exists.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "3. any other speed restrictions imposed.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "4. the Automatic stop signals shall be considered out of use.",
                              searchQuery
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {highlightSearchTerm(
                            "As per Para 707 (5) of IRPWM",
                            searchQuery
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div>
                          {highlightSearchTerm(
                            "S.R. 9.12 Part I (12).",
                            searchQuery
                          )}
                        </div>
                        <div>
                          {highlightSearchTerm(
                            "S.R. 9.12 Part I (11).",
                            searchQuery
                          )}
                        </div>
                        <div>
                          {highlightSearchTerm(
                            "S.R. 9.12 Part I (10) (a)",
                            searchQuery
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        26
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "During the period of overhauling of Interlocking lever frames.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          '"restrict the speed of train to 15 KMPH at the station".',
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S.R.15.06 (ii) (10) (vi)c (ii), G.R. 4.10.",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        27
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When temporary neutral section is provided.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Indicate the temporary neutral section and the location where the Loco Pilot has to lower and raise pantograph.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("S.R. 17.07(ii)", searchQuery)}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        28
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When there is an overhead equipment break down on double/multiple line section.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          'Caution order to the Loco Pilot of the first train shall contain "Observe a speed restriction of 20 KMPH by day and 10 KMPH by night and keep sharp lookout for any defects/obstructions on the line/lines and to stop short of obstruction or at the next station and report the condition of track and over head equipment or any other infringement to the section controller/Traction power controller".',
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("-", searchQuery)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Fourth table (items 29–33) */}
            <div className="mt-8">
              <div className="overflow-x-auto">
                <Table className="text-[13px] border border-border rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Circumstance</TableHead>
                      <TableHead>Particulars of caution</TableHead>
                      <TableHead className="min-w-[180px]">Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        29
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When emergency feeding arrangements are being introduced on account of failure of overhead equipment power supply.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Specify structure number to lower & raise pantograph.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S.R. 17.09(vi) (2) & (3). S.R. 17.02(iii)(c)",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        30
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When the Station Master is sending 6-2 bell code signal on double/multiple line sections.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        <div>
                          {highlightSearchTerm(
                            'Caution order to the Loco Pilots of trains running on the adjacent line/lines "Train parting is suspected proceed cautiously and stop short of any obstruction".',
                            searchQuery
                          )}
                        </div>
                        <div className="mt-2">
                          {highlightSearchTerm(
                            "In thick, foggy weather or in cuttings reducing visibility to very low levels etc; the speed shall not exceed 15 KMPH.",
                            searchQuery
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("S.R. 4.17 (i).", searchQuery)}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        31
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Before despatching a train to a Station where the colour light signals are not burning due to power failure.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Advise the Loco Pilot of the absence of any light on the signal and therefore for keeping a good vigil and lookout and to stop at the foot of the First Stop signal post of the station.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S.R. 3.68 (i) (c) (2)",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        32
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "When goods stock is attached to passenger trains, after certified fit by the train examiner, to run on passenger trains.",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          '"Speed not to exceed 75 KMPH on Broad Gauge and 50/40 KMPH on Metre Gauge.',
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "S.R. 4.34 (iii) (a) & (b)",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-center align-top">
                        33
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Any other condition or circumstances which may require the issue of a caution order or caution order issued under local or special instructions",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("-", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("-", searchQuery)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* S.R. 4.09(ii) Sending of information */}
            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-6 text-lg">
                S.R. 4.09(ii) Sending of information.-
              </h4>
              <div className="space-y-4 text-justify">
                <p>
                  {highlightSearchTerm(
                    "(1) Whenever in consequence of the line including overhead equipment being under repairs or for any other reasons, special precautions are necessary or when any danger to safety of trains is apprehended the Station Master receiving such information shall immediately inform the Station Master at the other end of the affected block section, the Controller, the Power Controller, the centralized Traffic Control Operator, the Traction Loco Controller, the Traction Power Controller, the Loco Foreman, other railway servants concerned and the Notice station or stations (to be specified in the Working Time Table) of such conditions under exchange of Private Numbers.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(2) The Controller, the Centralised traffic Control Operator, the Traction Power Controller, the Traction Loco Controller, the Power Controller shall in turn ensure that all the Station Masters and the Loco Foremen concerned have been advised of such conditions.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            {/* S.R. 4.09(iii) Procedure for issue of Caution Order */}
            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-6 text-lg">
                S.R.4.09(iii) Procedure for issue of Caution Order:-
              </h4>

              <div className="space-y-6">
                {/* Subsection (1) */}
                <div>
                  <h5 className="font-semibold text-foreground mb-3">
                    (1) BY THE STATION MASTERS AT EITHER END OF THE AFFECTED
                    BLOCK SECTION.
                  </h5>

                  <div className="space-y-4 text-justify">
                    <div>
                      <p className="mb-2">
                        {highlightSearchTerm(
                          "(i) The Station Master receiving advice about the line being under repairs or any other eventuality endangering safety of trains necessitating exercise of caution, shall not block section either from his station or from the other end; unless:-",
                          searchQuery
                        )}
                      </p>
                      <div className="ml-6 space-y-2">
                        <p>
                          {highlightSearchTerm(
                            "(a) the Station Master at the other end has acknowledged receipt of such information;",
                            searchQuery
                          )}
                        </p>
                        <p>
                          {highlightSearchTerm(
                            "(b) he has warned the Loco Pilot and the Guard of the danger ahead and its location by the issue of a Caution Order except in case of permanent speed restrictions which are notified in the Working Time Table; or",
                            searchQuery
                          )}
                        </p>
                        <p>
                          {highlightSearchTerm(
                            "(c) he has ensured that Caution Order has been issued by the Notice station concerned; or",
                            searchQuery
                          )}
                        </p>
                        <p>
                          {highlightSearchTerm(
                            "(d) he has received advice about restoration of normal working.",
                            searchQuery
                          )}
                        </p>
                      </div>
                    </div>

                    <p>
                      {highlightSearchTerm(
                        "(ii) The Station Master at the other end of the affected block section shall also take action in accordance with sub-clauses (b) to (d) of clause (1) (i) of S.R. 4.09 (iii)",
                        searchQuery
                      )}
                    </p>

                    <p>
                      {highlightSearchTerm(
                        "(iii) Run through trains shall be stopped out of course for issue of Caution Order till such time it has been ensured that a Caution Order has been issued by the Notice station concerned.",
                        searchQuery
                      )}
                    </p>

                    <p>
                      {highlightSearchTerm(
                        "(iv) Whenever work is taken up by overhead equipment staff under Power Block, they shall advise the Station Masters on either side of the block section to issue Caution Orders, if necessary, to the Loco Pilots of trains entering the block section.",
                        searchQuery
                      )}
                    </p>
                  </div>
                </div>

                {/* Subsection (2) */}
                <div>
                  <h5 className="font-semibold text-foreground mb-3">
                    (2) BY THE STATION MASTER OF NOTICE STATION-
                  </h5>

                  <div className="space-y-4 text-justify">
                    <div>
                      <p className="mb-2">
                        {highlightSearchTerm(
                          "(a) On receipt of advice of the line being under repairs or any other eventuality endangering the safety of trains necessitating exercise of caution, the Station Master of the notice station shall acknowledge the same and shall not allow any train which has to pass though the affected block section, to leave his station, unless he has warned the Loco Pilot and the Guard of the danger and its location through the issue of a caution order in Form T/409. He shall also advise the Station Master of the station in rear of site of restriction of the particulars of the first train to which the caution order has been issued.",
                          searchQuery
                        )}
                      </p>
                      <p className="ml-6">
                        {highlightSearchTerm(
                          "The name of the Notice station upto which the Caution Order has been given along with the total number of cautions to be observed shall be clearly written on the face of the Caution Order (T/409).",
                          searchQuery
                        )}
                      </p>
                    </div>

                    <p>
                      {highlightSearchTerm(
                        '(b) The Station Master of the notice station shall issue "Nil" Caution Orders to the Loco Pilots and the Guards of all trains leaving his station if he has received no intimation or any special precautions to be observed between his station and the next notice station of the train, in the direction of movement.',
                        searchQuery
                      )}
                    </p>
                  </div>
                </div>

                {/* Note */}
                <div className="text-xs text-muted-foreground p-3 bg-muted rounded border-l-4 border-primary">
                  <p>
                    <strong>Note.-</strong>{" "}
                    {highlightSearchTerm(
                      'The Loco Pilot shall not start the train and the Guard shall not give signal to start the train from a notice station unless they have received the Caution Order or "Nil" Caution Order advice.',
                      searchQuery
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Rules (3-8) */}
        <div className="mt-12 space-y-8">
          <div className="space-y-6">
            <p>
              <span className="font-semibold text-foreground">
                (3) In case of trains originating from stations other than
                Notice stations.-
              </span>
              {highlightSearchTerm(
                "In case of a train originating from a station which is not a Notice station, the Station Master shall consult the Controller or the Centralised Traffic Control Operator or the Traction Power Controller or the Notice station in rear or the notice station in advance (on single line section only) and issue Caution Order up to the Notice station in advance. However when such information cannot be collected by the station due to failure of communications with Control or the Notice station in rear or the Notice station in advance (on single line section only) and it becomes absolutely necessary to start the train originating from the station, the train should be started after issuing a Caution Order for the section upto the block station in advance and act upon the instructions available there. This procedure will be followed till a station is reached which can obtain particulars of all restrictions upto the Notice station in advance.",
                searchQuery
              )}
            </p>

            <div className="text-xs text-muted-foreground p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                <strong>Note:</strong>{" "}
                {highlightSearchTerm(
                  "The Caution Order to be issued for trains originating from stations other than notice stations shall also be in Form T/409. The 'Nil' Caution order referred herein shall be in Form T/A 409.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          <div>
            <p>
              <span className="font-semibold text-foreground">
                (4) Change of train crew en-route.-
              </span>
              {highlightSearchTerm(
                "In case of change of train crew enroute the Loco Pilot/Guard taking over charge shall take over all Caution orders relating to his train to acquaint himself of the conditions on the line giving due acknowledgement to the Loco Pilot/Guard who is being relieved.",
                searchQuery
              )}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold text-foreground">
                (5) Attaching of Assisting /Banking engine en-route.-
              </span>
              {highlightSearchTerm(
                "In case of an assisting or a banking engine being attached at a station enroute, the responsibility for acquainting himself about restrictions shall lie on the Loco Pilot of such an engine who shall contact the train engine Loco Pilot or the Guard as the case may be and get the necessary information.",
                searchQuery
              )}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold text-foreground">
                (6) During failure of communications.-
              </span>
              {highlightSearchTerm(
                "During failure of communications, the Station Master of the Station immediately in rear of the affected block section shall issue Caution Order to trains of all descriptions irrespective of whether it is a single line section or a double line section and irrespective of the system of working in force on the section.",
                searchQuery
              )}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold text-foreground">
                (7) In case of Power Blocks on electrified section.-
              </span>
              {highlightSearchTerm(
                "In case it becomes necessary to permit movement of vehicles hauled by steam or diesel locomotives on a section, under Power Block for a running line, a Caution Order shall be issued as per rules. While asking for the Power Block, the Traction Power Controller concerned shall invariably mention the duration of the Power Block, the Block stations and the exact kilometrage between which the work is to be done, the nature of work, the speed at which the train shall travel, and other special precautions required to be observed by the Loco Pilot.",
                searchQuery
              )}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold text-foreground">
                (8) In case of Local/Suburban trains.-
              </span>
              {highlightSearchTerm(
                "In the case of trains running on suburban sections, Caution order shall be issued to the Loco Pilots and Guards by the Station Masters of only such stations as are specified in the Working Time Table except in case of emergency necessitating sudden imposition of speed restriction. In respect of these trains, the Caution Orders may be either typed, cyclostyled or printed as considered necessary, covering the entire section on which the train is to run and shall be issued only once unless some speed restriction/restrictions is/are required to be cancelled or some further speed restriction/restrictions is/are required to be imposed.",
                searchQuery
              )}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold text-foreground">
                (9) In case of stations where no train is booked to stop:-
              </span>
            </p>
            <div className="ml-6 space-y-4 mt-4">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "A Caution Order shall normally not be issued except in an emergency necessitating sudden imposition of speed restriction; and",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "If any information warranting issue of a Caution Order received by the Station Master of such a station, he shall immediately advise the adjoining Block Stations, for the issue of Caution Order and only after obtaining their acknowledgements in this regard under exchange of Private Numbers, shall acknowledge the message requiring imposition of speed restriction.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "On receipt of such information, the Station Master of the adjoining station who receives the information first shall act as if he had himself received the message for imposition of the restriction.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </div>

        {/* S.R.4.09(iv) Description and preparation of Caution Order */}
        <div className="mt-12">
          <h4 className="font-semibold text-foreground mb-6 text-lg">
            S.R.4.09(iv) Description and preparation of Caution Order:-
          </h4>
          <div className="space-y-6">
            <p>
              <span className="font-semibold text-foreground">(a)</span>{" "}
              {highlightSearchTerm(
                "All forms should be serially numbered and the name of the station issuing it shall be stamped on each foil. It should be in three foils-one each for the Loco Pilot, the Guard and the station record. When more than one engine is attached to a train, additional foils of Caution Order shall be prepared for delivery to such Loco Pilots in addition to the leading Engine Loco Pilot.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(b)</span>{" "}
              {highlightSearchTerm(
                "The printing of Caution Order forms should be bilingual .i.e., in English and Hindi.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(c)</span>{" "}
              {highlightSearchTerm(
                "Station codes shall not be used. Names of the stations concerned should be written in full, as given in the Working Time Table. No entries should be made on the back of the Caution Order. If more than one Caution Order form is used. pages should be serially numbered as page 1, page 2, page 3 etc.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(d)</span>{" "}
              {highlightSearchTerm(
                "Caution Order shall be specifically made out for each train separately except at specified stations and for specified trains e.g., Rajdhani Express, through goods trains with long runs, local/suburban trains etc., in which case it may be typed, cyclostyled or printed provided, that it shall be checked up again at the time of service to ensure that all locations where caution is required to be observed have been incorporated therein. Necessary provisions in this regard shall be made in the Station working Rules of stations concerned and such stations/trains shall be specified in the Working Time Table. Wherever speed restrictions are required to be observed at two or more locations the kilometrage of all such stations shall be indicated in geographical order in relation to the direction of movement.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(e)</span>{" "}
              {highlightSearchTerm(
                "It shall always be dated and signed in full.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(f)</span>{" "}
              {highlightSearchTerm(
                "In case of any error or over-writing, it shall be cancelled and a fresh one prepared.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(g)</span>{" "}
              {highlightSearchTerm(
                "Master of the block station immediately in rear of the affected block section to the Loco Pilots of all scheduled stopping trains and of those trains stopping out of course",
                searchQuery
              )}
            </p>

            <p className="mt-4">
              {highlightSearchTerm(
                "Caution Orders shall also be given to the Loco Pilots of run through trains.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                'Issue of "Reminder" caution order may be dispensed with if the Station Master on duty is able to establish communication with the Loco Pilot of the stopping train through VHF and ensure that the Loco Pilot is in possession of the advice issued at the notice station.',
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "Caution Order may not be issued on suburban sections under special instructions.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(h)</span>{" "}
              {highlightSearchTerm(
                "Train Signal Register against the entries for the train quoting the progressive number of the Caution Order. (Correction Memo No.5/2008 dated. 23.12.2008)",
                searchQuery
              )}
            </p>
          </div>
        </div>

        {/* S.R.4.09(v) Service of Caution Order */}
        <div className="mt-12">
          <h4 className="font-semibold text-foreground mb-6 text-lg">
            S.R.4.09(v) Service of Caution Order:-
          </h4>
          <div className="space-y-6">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "The Caution Order shall be delivered to the Loco Pilot and Guard of a train by the Station Master either personally or through a competent railway servant deputed by him and the signatures of Loco Pilot and Guard obtained on the record foil in token of them having received and understood it. When more than one foil is served, each counter foil will be signed by the Loco Pilot and Guard.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "In case a Loco Pilot is unable to understand the contents of the Caution Order, he shall call upon the Station Master to have it explained. Under special instructions, the responsibility for explaining the contents of the Caution Order may be entrusted to the Guard of the train in big yards.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "In the case of ascending trains on the Nilagiri Railway, the Caution Order shall also be shown to the leading Brakesman and his signature obtained on both the counter foil and Record foil. The Loco Pilot of the train before accepting such Caution Order shall satisfy himself that the signature of the Guard (and also that of the leading Brakesman on the Nilagiri Railway) has been obtained on both the foils.",
                searchQuery
              )}
            </p>
          </div>
        </div>

        {/* S.R.4.09(vi) Method of notifying cancellation of special precautions */}
        <div className="mt-12">
          <h4 className="font-semibold text-foreground mb-6 text-lg">
            S.R.4.09(vi) Method of notifying cancellation of special
            precautions:-
          </h4>
          <div className="space-y-6">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "When a competent railway servant finds it necessary to impose any speed restriction or any special precaution on a portion of a line, including overhead equipment due to repairs or work or for any other reason, he shall-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-4">
              <p>
                <span className="font-semibold text-foreground">(i)</span>
                <div className="ml-4 space-y-2">
                  <p>
                    <span className="font-semibold text-foreground">(a)</span>{" "}
                    {highlightSearchTerm(
                      "advice in writing the Station Master of the nearest block station (preferably the block station controlling entry into the block section concerned) the exact kilometrage and the station and the station at which or the stations between which the restriction or special precaution is to be observed, its nature and likely duration, the method of protection of the place of restriction together with the location where engineering indicators are to be exhibited etc., and also advise other railway servants concerned as per clause (i) of S.R.4.09(ii) who are required to be notified in this regard; and",
                      searchQuery
                    )}
                  </p>

                  <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                    <p>
                      <strong>Note:-</strong>{" "}
                      {highlightSearchTerm(
                        "Refer S.R. 15. 08 (i) (e) also",
                        searchQuery
                      )}
                    </p>
                  </div>

                  <p>
                    <span className="font-semibold text-foreground">(b)</span>{" "}
                    {highlightSearchTerm(
                      "not commence such operations until written acknowledgment is received from the Station Master.",
                      searchQuery
                    )}
                  </p>
                </div>
              </p>

              <p>
                <span className="font-semibold text-foreground">(ii)</span>{" "}
                {highlightSearchTerm(
                  "The Station Master receiving the advice shall not acknowledge it until he has advised the Station Master of the block station at the other end of the block section, to be affected and obtained his acknowledgement.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          <p className="mt-6">
            <span className="font-semibold text-foreground">(2)</span>{" "}
            {highlightSearchTerm(
              "When the cause of such restriction or special precaution has been removed, the competent railway servant shall advise the fact to the Station Master of the nearest block station under written advice and other officials concerned who were notified earlier of the imposition of restriction.",
              searchQuery
            )}
          </p>
        </div>

        {/* S.R.4.09(vii) Action by the Station Master after Cancellation of the speed restriction */}
        <div className="mt-12">
          <h4 className="font-semibold text-foreground mb-6 text-lg">
            S.R.4.09 (vii) Action by the Station Master after Cancellation of
            the speed restriction:-
          </h4>
          <div className="space-y-6">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "The Station Master receiving advice regarding the removal of the restriction, shall advise this fact to the Station Master at the other end of the block section concerned, Station Master of Notice stations and other railway servants who were advised about it earlier. After issue of the advice regarding cancellation of the Caution Order the Station Master shall discontinue the issue of the Caution Order.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "If no train is booked to stop at the station, the advice regarding the removal of restriction shall be sent to the Station Master of one of the adjoining block stations who should take action in accordance with S.R. 4.09 (vii)(1).",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "Wherever the issue of Caution Orders has to be continued, the Station Master who is to be relieved, shall make an entry in the following form in the Station Diary, for the guidance of his reliever and ensure his reliever notes and signs for his entry before he breaks off duty:-",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "Regarding issue of Caution Order for trains entering",
                searchQuery
              )}
            </p>
          </div>
        </div>

        {/* S.R.4.09(viii) Record of Caution Orders */}
        <div className="mt-12">
          <h4 className="font-semibold text-foreground mb-6 text-lg">
            S.R.4.09 (viii) Record of Caution Orders:-
          </h4>
          <div className="space-y-6">
            <p>
              <span className="font-semibold text-foreground">(a)</span>{" "}
              {highlightSearchTerm(
                "At all stations where Caution Orders are issued, the Station Master shall keep an upto-date record of all the speed restrictions imposed with the dates of their enforcement and cancellation, authority, nature, etc., in the Caution Order Register and bring forward every Monday, in geographical order in relation to the direction of movement, the Caution Order due to be issued. No code shall be used, except station codes in this register.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(b)</span>{" "}
              {highlightSearchTerm(
                "Similar records shall be kept at other places like Control offices, Loco sheds, etc., also where information in this regard is received.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(c)</span>{" "}
              {highlightSearchTerm(
                "The Loco Pilots and the Guards shall hand over the Caution Orders to the Loco Foreman and Station Master respectively at the end of their journey along with other train papers except in case of change of crew en route.",
                searchQuery
              )}
            </p>
          </div>
        </div>

        {/* S.R.4.09(ix) Preservation of Caution Orders */}
        <div className="mt-12">
          <h4 className="font-semibold text-foreground mb-6 text-lg">
            S.R. 4.09 (ix) Preservation of Caution Orders.-
          </h4>
          <p>
            {highlightSearchTerm(
              "Record foils of the Caution Orders shall be preserved for a period of twelve months after issue.",
              searchQuery
            )}
          </p>
        </div>

        {/* Rule 4.10 - Limits of speed over facing points */}
        <section id="4.10" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.10.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Limits of speed over facing points:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "The speed of trains over non-interlocked facing points shall not exceed 30 kilometers an hour in any circumstances, and the speed over turn-outs and crossovers shall not exceed its permissible speed or 30 kilometers an hour whichever is less, unless otherwise prescribed by approved special instructions, which may permit a higher speed. (C.M.No. 1/2020 dated 16.03.20)",
                searchQuery
              )}
            </p>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                (Ref: ED/Safety-II/Railway Board letter No.2020/Safety
                (A&R)/19/7 dated 12.03.2020)
              </p>
              <p className="mt-2">
                {highlightSearchTerm(
                  "Para 408 1(a) of IRPWM specifies 15 Kmph",
                  searchQuery
                )}
              </p>
            </div>

            <p className="mt-6">
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "Subject to the provisions of sub-rule (1), a train may run over interlocked facing points at such speed as may be permitted by the standard of interlocking.",
                searchQuery
              )}
            </p>

            <p className="mt-6">
              <span className="font-semibold text-foreground">
                S.R. 4.10(i)
              </span>{" "}
              {highlightSearchTerm(
                "The speed of trains over the facing points on the Main line at a station shall not exceed the limit laid down for each station in the working Time Table for passenger trains.",
                searchQuery
              )}
            </p>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                <strong>Note:</strong>{" "}
                {highlightSearchTerm(
                  "Points, both facing and trailing are in non-interlocked condition whenever the signal governing / detecting",
                  searchQuery
                )}
              </p>
              <p className="mt-2">
                {highlightSearchTerm(
                  "(Correction Memo No.04/2016 dated 02.12.16)",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.11 - Limits of speed while running through stations */}
        <section id="4.11" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.11.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Limits of speed while running through stations:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No train shall run through an interlocked station at a speed exceeding 50 kilometres an hour or such less speed as may be prescribed by approved special instructions unless the line on which the train is to run has been isolated from all other lines by the setting of points or other approved means, and interlocking is such as to maintain this condition during the passage of the train.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "In every case in which trains are permitted to run through on a non-isolated line, all shunting shall be stopped and no vehicle unattached to an engine or not properly secured in accordance with Rule 5.23 may be kept standing on a connected line which is not isolated from the through line.",
                searchQuery
              )}
            </p>

            <p className="mt-6">
              <span className="font-semibold text-foreground">
                S.R. 4.11 (i)
              </span>{" "}
              {highlightSearchTerm(
                "No train shall be allowed to run through on a loop line with 1 in 8 ½ turn out, in facing or trailing direction. This restriction applies not only to run through trains but also to stopping trains which have to be passed through on the Loop line to the outermost trailing points for crossing purposes.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.12 - Engine pushing */}
        <section id="4.12" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.12.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Engine pushing:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No engine or self-propelled vehicle shall push any train outside limits except in accordance with special instructions and at a speed not exceeding 25 kilometres an hour;",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-4">
              <p>
                {highlightSearchTerm(
                  "Provided that this sub-rule shall not apply to a train, the leading vehicle of which is equipped with driving apparatus and which may be operated under approved special instructions.",
                  searchQuery
                )}
              </p>

              <p>
                {highlightSearchTerm(
                  "Provided further that this sub-rule shall not apply to an engine assisting in rear of a train, which may be permitted under approved special instructions to run without being coupled to the train;",
                  searchQuery
                )}
              </p>

              <p>
                {highlightSearchTerm(
                  "Provided also that no train which is not equipped with continuous vacuum/air brake shall be pushed outside station limits except in case of emergency:",
                  searchQuery
                )}
              </p>

              <p>
                {highlightSearchTerm(
                  "in front of the engine may be permitted to run at a maximum speed of 40 kilometres an hour.",
                  searchQuery
                )}
              </p>
            </div>

            <p className="mt-6">
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "For movement of trains outside station limits with engine pushing during night or in thick, foggy or tempestuous weather impairing visibility or where otherwise prescribed by special instructions, the leading vehicle of such trains shall be equipped with the prescribed headlight and marker lights except in case of emergency.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "When trains are worked as described in sub-rules (1) and (2), the engine pushing the load when it is the rearmost, or the rearmost vehicle if any, shall carry a tail board or a tail lamp.",
                searchQuery
              )}
            </p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.12(i)(a) An engine may push a train outside the Station
                Limits in the following circumstances:
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm(
                    "In regular working with ascending trains on the Mettupalaiyam Udagamandalam Section under Special Instructions.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm(
                    "In regular working with material trains.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm(
                    "In special circumstances, under Special Instruction.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm(
                    "In any unexpected circumstances, such as the inability of the engine to haul its load, the train meeting with an obstruction etc., and",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm(
                    "In emergency working with relief trains. Passenger special trains, for clearing stranded passengers from accident spots, etc.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (b) On such occasions, the following precautions shall be
                observed:
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm(
                    "Caution Order shall be issued to pushing trains in accordance with Rule 4.09.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>
                  <div className="ml-4 space-y-2">
                    <p>
                      <span className="font-semibold text-foreground">(i)</span>{" "}
                      {highlightSearchTerm(
                        "The Guard of a pushing train shall travel in the leading vehicle if it is fitted with a vacuum brake or air brake valve or hand brake. If the leading vehicle is not so fitted, the Guard shall travel in the nearest vehicle thereto which is so fitted. The speed of the train, with the Guard travelling in the leading vehicle, shall not exceed 15kilometres an hour, with the Guard travelling in any other vehicle shall not exceed 10 kilometres an hour.",
                        searchQuery
                      )}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        (ii)
                      </span>{" "}
                      {highlightSearchTerm(
                        "The Guard of a pushing train shall keep a good look-out and continuously exhibit proceed hand signal to the proceed hand signal may be due to an obstruction and the Loco Pilot shall stop the train at once. The Loco Pilot shall keep a good look-out, especially in the direction in which the train in running, and be prepared to stop the train short of any obstruction.",
                        searchQuery
                      )}
                    </p>
                  </div>
                </p>
              </div>

              <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p>
                  <strong>Note.-</strong>{" "}
                  {highlightSearchTerm(
                    "In thick, foggy or tempestuous weather impairing visibility for at least 1200 metres on Broad Gauge and 1000 metres on Metre gauge and Narrow Gauge, and Guard shall walk at least 600 metres in advance of the train on Broad Gauge and 500 metres in advance of the train on Metre Gauge and Narrow gauge plainly showing a Stop hand signal to stop any approaching train and the train behind him shall follow at walking speed.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm("Para 853 of IRPWM", searchQuery)}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (3)(i) On the single line, a train pushing back in unexpected
                circumstances:
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "On the single line, a train pushing back in unexpected circumstances, for example due to the inability of the engine to haul its load or the train meeting with an obstruction, shall be brought to a stand at the First Stop signal. The Guard shall make use of the signal post telephone if provided at the First Stop signal to advise the Station Master (or) the Guard shall proceed to the station exhibiting a Stop hand signal towards the station, advise the Station Master and return to the train. The reception and go into the station.",
                  searchQuery
                )}
              </p>

              <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p>
                  <strong>Note.-</strong>{" "}
                  {highlightSearchTerm(
                    "pushing back in emergency working and the train shall enter the station as usual.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (ii) On the double line, a running train pushing back:
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "On the double line, a running train pushing back, for any reason, shall be brought to a stand short of the Last Stop signal of the line on which he is backing or opposite to and short of the First Stop signal of the other line whichever is farther away from the station. The Guard shall then proceed to the station exhibiting a stop had signal towards the station, advise the Station Master and return to the train. The Station Master shall receive the train into the station following the provisions of G.R/S.R 5.10.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.13 - Limits of speed with engine tender foremost */}
        <section id="4.13" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.13.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Limits of speed with engine tender foremost:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)(a)</span>{" "}
              {highlightSearchTerm(
                "A passenger train or a mixed train shall not be drawn outside station limits by a steam engine running tender foremost, except-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-2">
              <p>
                <span className="font-semibold text-foreground">(i)</span>{" "}
                {highlightSearchTerm(
                  "under a written order issued by the authorized officer; or",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(ii)</span>{" "}
                {highlightSearchTerm(
                  "in a case of unavoidable necessity, to be established by the Loco Pilot.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(b)</span>{" "}
              {highlightSearchTerm(
                "When any such train is so drawn, the speed shall not exceed 25 kilometres an hour, or such higher speed, not exceeding 40 kilometres an hour, as may be authorized by approved special instructions.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "In cases of unavoidable necessity, goods trains may run with steam engines tender for most at a speed not exceeding 25 kilometres an hour or such higher speed, which shall, in no circumstances, exceed 40 kilometres an hour, as may be laid down by special instructions.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "When trains have to be worked with steam engines tender foremost as a regular measure under sub-clause (i) of clause (a) of sub-rule (1) and sub-rule (2), the head light and marker lights as prescribed in Rule 4.14 shall be provided on the tender.",
                searchQuery
              )}
            </p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R. 4.13 (i)(a) Trains carrying passengers:-
              </h4>
              <p className="ml-6">
                <span className="font-semibold text-foreground">(1)</span>{" "}
                {highlightSearchTerm(
                  "Specified trains carrying passengers can run with the engine tender foremost on the sections sanctioned by the Commissioner of Railway Safety at the speed laid down by him, subject to a maximum speed of 40 Kmph. The sanction for the trains to run with the engine tender foremost, the section and the speed limit are indicated in the Working Time Table. On Occasions like festivals etc., specified trains may be run with the engine tender foremost on the temporary sanction of the Commissioner of Railway Safety. Such sanctions are specially notified to staff.",
                  searchQuery
                )}
              </p>

              <p className="ml-6 mt-6">
                <span className="font-semibold text-foreground">(2)</span>{" "}
                {highlightSearchTerm(
                  "In emergencies, if it found necessary to start a train carrying passengers, not coming under S.R.4.13 (i)(a)(1), from any station on any section with the engine running tender foremost, the Station Master shall give a written authority to the Loco Pilot in the following form: -",
                  searchQuery
                )}
              </p>

              {/* Written Authority Form */}
              <div className="ml-6 mt-6 border-2 border-black p-4 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="font-semibold">Station</span>
                    <div className="ml-2 border-b border-black border-dotted w-32"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">Date</span>
                    <div className="ml-2 border-b border-black border-dotted w-32"></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-2">
                    <span className="font-semibold">To</span>
                  </div>
                  <div className="flex items-center">
                    <span>The Loco Pilot of train (No. and description).</span>
                    <div className="ml-2 border-b border-black border-dotted flex-1"></div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-justify">
                    You are hereby authorised to run with your engine tender
                    foremost at a speed not exceeding 25 kilometres an hour.
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="border-b border-black border-dotted w-32"></div>
                  <div className="text-right">
                    <span className="font-semibold">Station Master</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (b) Trains not carrying passengers: -
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "The speed of trains not carrying passengers when worked by engines with tender foremost shall not exceed 40 Kmph. This will also apply to light engines when running tender foremost.",
                  searchQuery
                )}
              </p>

              <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p>
                  <strong>Note: -</strong>
                </p>
                <p className="mt-2">
                  <span className="font-semibold">(1)</span>{" "}
                  {highlightSearchTerm(
                    "A train worked by a tank engine with the tank-side foremost may run at the normal speed. This will also apply to light engines when running tank-side foremost.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">(2)</span>{" "}
                  {highlightSearchTerm(
                    "In all the above cases, it shall be ensured that the tender or tank-side is fitted with cowcatcher by day and cowcatcher as well as headlight in working condition by night.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R. 4.13 (ii)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "If a train, whether carrying passengers or not, has to be worked by an engine running tender foremost or tank-side foremost, not fitted with cow-catcher by day or cow-catcher or headlight or both by night, then the speed of the train shall not exceed 25 Kmph. on Broad Gauge and Metre Gauge.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Sub-section Header: C. Equipment of Trains and Train Crew */}
        <div className="pt-8 mt-8 border-t border-document-border">
          <h3 className="text-xl font-semibold text-foreground">
            C. Equipment of Trains and Train Crew
          </h3>
        </div>

        {/* Rule 4.14 - Head light, marker light and speedometer */}
        <section id="4.14" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.14.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Head light, marker light and speedometer
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "A train shall not be worked at night or in thick, foggy or tempestuous weather impairing visibility or in long tunnels, unless the engine carries an electric headlight of an approved design and, in addition, two oil or electric white marker lights.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "An engine employed exclusively on shunting at station and yards shall, at night during thick, foggy or tempestuous weather impairing visibility, display such headlights as are prescribed by the Railway Administration, and exhibit two red marker lights in front and in rear.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "The electric headlight on the engine shall be fitted with a switch to dim the light and shall be dimmed-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-2">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "when the train remains stationary at a station;",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "when the train is approaching another train which is running in the opposite direction on double or multiple track of same or different gauges; and",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "on such other occasions as may be prescribed by special instructions.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(4)</span>{" "}
              {highlightSearchTerm(
                "In case the electric headlight fails or a train has to be worked with the engine running tender foremost in an emergency, the engine shall display the two oil or electric white marker lights referred to in sub-rule (1) pointing in the direction of movement and the train shall run at a speed prescribed by special instructions.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(5)</span>{" "}
              {highlightSearchTerm(
                "In case of defective electric head light of locomotive running in a section provided with reflective type of engineering fixed signal, during night or thick foggy weather impairing visibility on BG and MG, the Loco Pilot shall work the train cautiously at a speed not exceeding the severest temporary speed restriction imposed in the block section or 40 Kmph whichever is less.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(6)</span>{" "}
              {highlightSearchTerm(
                "Coaching locos should not be turned out from home shed if the speedometers/recorders are in defective condition. In case of speedometer/recorder becoming defective during the run, the train should run at a speed prescribed by special instructions.",
                searchQuery
              )}
            </p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.14.(i)
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "The Loco Pilot of an incoming train shall dim the electric-headlight on approaching the Home signal or the outermost points where there is no Home signal and keep it dimmed until the train passes the Home signal or the outermost points, while leaving the station.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "Loco Pilots shall dim the electric headlight temporarily when this is necessary to avoid dazzling cattle or to enable the aspects of signals (lights) to be picked up. The electric headlight shall be switched on again after passing the cattle or after observing the signal.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                SR. 4.14 (ii) Headlights: -
              </h4>
              <p className="ml-6 mb-4">
                {highlightSearchTerm(
                  "The headlights to be carried on engines on the double and single lines, for use in case the electric headlights fails, or when electric headlight is not provided, are prescribed below: -",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "Any train or light engine, working outside station limits. - Two white lights in the front of the engine, one on either side.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "Any steam engine working outside station limits tender foremost. Two white lights centrally one above the other on the tender.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "For Electric Multiple Unit Stock.- One headlight and one code light shall be provided.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.15 - Tail and side lights */}
        <section id="4.15" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.15.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Tail and side lights:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "At night or in thick, foggy or tempestuous weather impairing visibility, no train shall be worked outside station limits unless it has-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-4">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "in the case of an engine with vehicles attached, save in a case to which subrule(2) applies, at least one red tail light, and two side lights showing red towards the rear and white towards engine:",
                  searchQuery
                )}
              </p>
              <p className="ml-6">
                {highlightSearchTerm(
                  "Provided that provision of sidelights on goods trains and Electric Multiple Unit train may be dispensed with.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "in the case of a single engine without vehicle attached at least one red tail light; and",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "in the case of two or more engines coupled together without vehicles attached, at least one red tail light affixed to the rear engine.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "A colliery pilot, i.e., a train used for collecting or distributing vehicles in colliery siding, when working in a block section or in the colliery sidings taking off from a block section, need carry a red tail light only as it enters or leaves the block station, at either end of such block section, provided that special instructions are issued to ensure that no other train is permitted to proceed into the block section until the Guard of the colliery pilot has certified that he has left no vehicle obstructing the block section in which he has been working.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "When trains may run in the same direction on parallel lines, the side lights mentioned in clause (a) of sub-rule (1) may be arranged in accordance with special instructions.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(4)</span>{" "}
              {highlightSearchTerm(
                "When a train has been shunted for a following train to pass, the tail and side lights mentioned in clause (a) of sub-rule (1) shall be dealt with in accordance with special instructions.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(5)</span>{" "}
              {highlightSearchTerm(
                "Within station limits or in a siding, an engine employed in shunting shall have tail lights in accordance with special instructions.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.16 - Tail board or tail lamp */}
        <section id="4.16" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.16.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Tail board or tail lamp:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "In order to indicate to the staff that a train is complete, the last vehicle shall, except as provided for in sub-rule (2), be distinguished by affixing to the rear of it-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-2">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "by day, a tail board of approved design or a red painted tail lamp of approved design which may be unlit, or",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "by night, as well as in thick, foggy or tempestuous weather impairing visibility during day, a red tail lamp of approved design displaying a flashing red light to indicate last vehicle check device or",
                  searchQuery
                )}
              </p>
              <div className="text-xs text-muted-foreground mt-2">
                {highlightSearchTerm(
                  "(Correction Memo 1/2010 dated 23.02.2010)",
                  searchQuery
                )}
              </div>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "such other device as may be authorized by special instructions.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "A Colliery pilot, i.e., a train used for collecting or distributing vehicles in colliery sidings, when working in a block section or in the colliery siding taking off from a block section, need carry a tail board or tail lamp, or such other device as may be authorized by special instructions, only as it enters or leaves the block station at either end of such block section, provided that special instructions are issued to ensure that no other train is permitted to proceed into the block section until the Guard of the colliery pilot certifies that he has left no vehicle obstructing the block section in which he has been working.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "In emergencies only, and under special instructions in each case, a red flag may be used in lieu of a tail board or an unlit tail lamp.",
                searchQuery
              )}
            </p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.16 (i)
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  {highlightSearchTerm(
                    "During day, a tail board with the disc painted with signal red back ground with painted white thereon shall be attached to the rear of the last vehicle of all trains except Electric Multiple Unit stock. During day, a Turn over tailboard painted with Red Cross mark on white background is provided on the Electric Multiple Unit stock.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "During day and night, the built-in marker lights (Red) provided below the wind screen of rear cab shall be illuminated by Guard as Tail Lamp of the Train Set (like Vande Bharat). If built-in flickering Tail lamp is not available or is defective, LED based flashing tri-colour hand signal lamp shall be used.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "When vehicles are attached in rear of the rearmost brake-van/vehicle, the Guard shall see that during day, the tail board is removed from the brake van/vehicle and attached to the rear of the rearmost vehicle and during night, the tail lamp of the brake-van is extinguished and the tail lamp is lit on the rear most vehicle.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    'The Guard shall also ensure that the built-in-red light of SLR / Inspection carriage / vehicle is switched "off" when another vehicle is attached in rear of the SLR/ Inspection carriage / vehicle.',
                    searchQuery
                  )}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  {highlightSearchTerm(
                    "(Correction Memo 02/2023 dated 26.02.2023)",
                    searchQuery
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (ii)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "For the purpose of S.R.4.16 (i), an engine or a damaged vehicle attached in rear of a train, shall be the last vehicle.",
                  searchQuery
                )}
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (iii)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "Guards working on double line sections shall observe the Tail Board or Tail Lamp of passing trains and report at the next station when the Tail Board is missing or Tail Lamp is not burning properly.",
                  searchQuery
                )}
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                (iv)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "No train shall be allowed to leave a station with a red flag or an unlit red painted tail lamp by day in lieu of Tail board unless specially authorized by the Divisional Railway Manager.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.17 - Responsibility of Station Master regarding tail board or tail lamp of passing trains */}
        <section id="4.17" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.17.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Responsibility of Station Master regarding tail board or tail lamp
              of passing trains:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "The Station Master shall see that the last vehicle of every train passing through his station is provided with a tail board or tail lamp or such other device in accordance with the provisions of Rule 4.16.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "If a train passes the station without such indication to show that it is incomplete, the Station Master Shall-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-2">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "immediately advise the station in advance to stop the train to see that the defect is remedied and to advise whether or not the train is complete.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "meanwhile withhold the closing of block section to ensure that no train is allowed to enter the block section from the station in rear, and",
                  searchQuery
                )}
              </p>
              <div className="text-xs text-muted-foreground mt-2">
                {highlightSearchTerm(
                  "(Correction Memo No. 5 dated 09.10.2006)",
                  searchQuery
                )}
              </div>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "unless the station in advance has advised that the train is complete, neither consider the block section in rear as clear nor close it.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "Where in a section a block proving Axle Counter or Continuous track circuiting between block stations and complete track circuiting of station section excluding non-running lines of the receiving station is installed and is functioning and there is a clear indication of clearance of block section as well as complete arrival of the train as per indication given, if a train passes a station without conforming to the provisions of sub clause (1) above, the station Master shall still advise the station in advance to stop the train to see that the defect is remedied and he need not withhold closing of block section in rear as prescribed in clause (b) and (c) of sub rule (2) in such cases.",
                searchQuery
              )}
            </p>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                {highlightSearchTerm(
                  "(Correction Memo No. 5 dated 09.10.2006)",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Additional content for Rule 4.17 */}
        <div className="mt-8 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "LV board bell signal shall put fixed signals at 'On' stop any train from the opposite direction, advise the Guard and the Loco Pilot, of the circumstances and issue a caution order to proceed cautiously and stop short of any obstruction.",
              searchQuery
            )}
          </p>

          <p>
            {highlightSearchTerm(
              "The Loco Pilot of the train, after being so advised by the Station Master shall proceed into the block section at such speed as would permit him to bring his train to a halt well short of any obstruction under the visibility conditions available. In thick foggy weather, or in cuttings reducing visibility to very low levels etc. the speed shall not exceed 15 Kmph. The Loco Pilot would be authorised to run at higher speed after being cautioned depending on factors like clear visibility on straight track, the distance of the opposite line away from the line on which movement is taking place.",
              searchQuery
            )}
          </p>

          <p>
            {highlightSearchTerm(
              "In all such situations, the SM despatching the train in the direction in which the obstruction/infringement is apprehended after issuing caution shall take fully into account the possibility of train being brought back from short of the obstruction while",
              searchQuery
            )}
          </p>
        </div>

        {/* Rule 4.18 - Means of communication */}
        <section id="4.18" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.18.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Means of communication:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No passenger train or mixed train shall be despatched from any station, unless every passenger carriage is provided with means by which communication can be made with the Guard or the Loco Pilot.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "Sub-rule (1) shall not apply to:-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-2">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "Passenger or mixed trains in case of complete or partial failure of vacuum; and",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "Such particular trains as may be exempted under approved special instructions.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "If a Railway Administration is satisfied that mischievous use of the means of communication referred to in sub-rule (1) is prevalent, it may, notwithstanding anything contained in that sub-rule, direct the disconnection, for the time being, of the means of communication provided in all or any of the passenger carriages in any such train.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(4)</span>{" "}
              {highlightSearchTerm(
                "A within the meaning of this rule.",
                searchQuery
              )}
            </p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S. R. 4.18 (i)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "With reference to sub-rule (3) of Rule 4.18, Alarm chain apparatus should not vans, R.M.S.-cum-passenger coaches and ordinary coaches when used for carrying mails.",
                  searchQuery
                )}
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S. R. 4.18 (ii)
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "Whenever the automatic vacuum /air brake is applied by a passenger, the Loco Pilot shall stop the train in accordance with S. R. 4.45(ii). The Guard shall at once take steps to ascertain by whom and for what cause the chain was pulled and send a report to the Station Master of the next important station where the train is booked to stop with the names and addresses of the persons who pulled the chain and that of witnesses. The Guard shall also send a Special Report along with the Combined Train Report.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "In automatic block territories, the train shall be protected immediately in accordance with Rule 9.10. If the train is likely to halt for more than 15 minutes in non- automatic territories, it shall be protected in accordance with rule 6.03.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.19 - Equipment for Guards and Loco Pilots */}
        <section id="4.19" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.19.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Equipment for Guards and Loco Pilots:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "Each Guard and Loco Pilot shall have with him, while on duty with his train, the following equipment-",
                searchQuery
              )}
            </p>

            <div className="ml-6 space-y-2">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "a copy of these rules or such portions thereof as have been supplied to him under Rule 2.01,",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "a copy of the Working Time Table, and all correction slips and appendices, if any, in force on that section of the railway over which the train is to run,",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm("a hand signal lamp,", searchQuery)}
              </p>
              <p>
                <span className="font-semibold text-foreground">(d)</span>{" "}
                {highlightSearchTerm(
                  "a whistle (for Guards only),",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(e)</span>{" "}
                {highlightSearchTerm(
                  "a red flag and a green flag,",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(f)</span>{" "}
                {highlightSearchTerm(
                  "a stock of detonators sufficient to comply with the relevant rules as may be prescribed by special instructions.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(g)</span>{" "}
                {highlightSearchTerm(
                  "a first aid box (for Guards of passenger carrying trains only) and,",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(h)</span>{" "}
                {highlightSearchTerm(
                  "such other articles as may be prescribed by the Railway Administration in this behalf.",
                  searchQuery
                )}
              </p>
            </div>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "If any Guard or Loco Pilot is not in possession of any article mentioned or referred to in sub-rule (1), he shall report the fact to his superior who shall make good the deficiency.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "Each Guard and Loco Pilot shall have with him while on duty with his train two pairs of such spectacles as he is required to wear under medical advice.",
                searchQuery
              )}
            </p>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                <strong>Note.</strong>{" "}
                {highlightSearchTerm(
                  "Each Guard and Loco Pilot should also be in possession of a Watch in addition to the equipment prescribed in sub-rule (1).",
                  searchQuery
                )}
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.19 (i)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "Each Guard (with him/her or in Guard van) and Loco Pilot (with him/her or in Loco), while on duty with his/her train, shall have a copy (in hard or electronic form) of these rules or relevant portions thereof, as supplied to him/her under Rule 2.01 and a copy (in hard or in electronic form) of the working time table and the all correction slips and appendices, if any, in force on that section of the railway over which the train is to run.",
                  searchQuery
                )}
              </p>
              <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p>
                  {highlightSearchTerm(
                    "[Ref Executive Director/Safety-II, Railway Board letter No. 2020/Safety (A&R)/19/12 dated 17.12.2020]. (Correction Memo 01/2021 of 20.01.2021).",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm(
                    "Equipments of material train as per Para 850 of IRPWM",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.19(ii)
              </h4>
              <p className="ml-6">
                {highlightSearchTerm(
                  "whenever running staff is required to wear spectacles under medical advice, he shall have his name engraved on the spectacles.",
                  searchQuery
                )}
              </p>
              <div className="text-xs text-muted-foreground mt-2">
                {highlightSearchTerm(
                  "(Correction Memo 01/2021 of 20.01.2021).",
                  searchQuery
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.19(iii)
              </h4>
              <p className="ml-6 mb-4">
                {highlightSearchTerm(
                  "In addition to the equipment prescribed in Rule 4.19 Guards and Assistant Guards shall have-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm("A", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm("A carriage key,", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm(
                    "Sufficient number of padlocks, with keys,",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm(
                    "A case containing 10 detonators,",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm(
                    "A rough journal book, and",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(6)</span>{" "}
                  {highlightSearchTerm("A torch.", searchQuery)}
                </p>
              </div>

              <p className="ml-6 mt-6 mb-4">
                {highlightSearchTerm("Guards only shall have:-", searchQuery)}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm("One tail board.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm(
                    "One tail lamp with flashing red light.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm("One book of Form T/609.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm("Two red flags.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm(
                    "A red flashing hand signal lamp.",
                    searchQuery
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo. 03/2021 dated 25.08.2021).",
                      searchQuery
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">(6)</span>{" "}
                  {highlightSearchTerm("Complaint Book.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(7)</span>{" "}
                  {highlightSearchTerm(
                    "Vacuum Gauge/Pressure Gauge (for Goods trains only).",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(8)</span>{" "}
                  {highlightSearchTerm("Walkie-talkie set.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(9)</span>{" "}
                  {highlightSearchTerm(
                    "Two Private Number books.",
                    searchQuery
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo No.05/2008 dated 23.12.2008)",
                      searchQuery
                    )}
                  </span>
                </p>
              </div>

              <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p>
                  {highlightSearchTerm(
                    "(Correction Memo 01/2021 of 20.01.2021).",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  <strong>Note:-</strong>{" "}
                  {highlightSearchTerm(
                    "In the case of Guards working E.M.Us/Push Pull trains the equipment prescribed above may be modified according to requirement by the Divisional Railway Manager.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R. 4.19(iv)
              </h4>
              <p className="ml-6 mb-4">
                {highlightSearchTerm(
                  "In addition to the equipment prescribed in Rule 4.19, the Loco Pilot shall have:-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm(
                    "A copy in each of the General and Subsidiary Rule book and a copy in each of the Accident Manual, the Block Working Manual and the Operating Manual.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm(
                    "A case containing 10 detonators.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm("Rough Journal book.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm(
                    "One electric head lamp bulb and cab-light bulb.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm(
                    "Water gauge glass of different size with Dexine rubber washers for the various classes of engines ordinarily worked.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(6)</span>{" "}
                  {highlightSearchTerm(
                    "A red flashing hand signal lamp.",
                    searchQuery
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo. 03/2021 dated 25.08.2021).",
                      searchQuery
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">(7)</span>{" "}
                  {highlightSearchTerm(
                    "A copy of the Appendices to Working Time Table (A.W.T.T.) and the booklet on",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(8)</span>{" "}
                  {highlightSearchTerm("A Torch", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(9)</span>{" "}
                  {highlightSearchTerm("Walkie-talkie set.", searchQuery)}
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {highlightSearchTerm(
                  "(Correction Memo 01/2021 of 20.01.2021).",
                  searchQuery
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.19 (v)
              </h4>
              <p className="ml-6 mb-4">
                {highlightSearchTerm(
                  "For Electric Loco Pilots, the following items shall also be provided :-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm("Operating Manual.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm(
                    "A copy of the 25kv Alternating Current Traction Manual.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm(
                    "An insulated screw driver.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm("An insulated plier.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm("A Torch", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(6)</span>{" "}
                  {highlightSearchTerm("A Private Number book.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(7)</span>{" "}
                  {highlightSearchTerm("RE Telephone", searchQuery)}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo No. 3 / 2012 dated 11.01.13)",
                      searchQuery
                    )}
                  </span>
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {highlightSearchTerm(
                  "(Correction Memo 01/2021 of 20.01.2021).",
                  searchQuery
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                SR 4.19(vi)
              </h4>
              <p className="ml-6 mb-4">
                {highlightSearchTerm(
                  "Assistant Loco Pilots shall be provided with the following equipment:",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm("Red and Green flags.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm("Rough Journal book.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm("Working Time Table.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm(
                    "A tri-colour torch light.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm("Personal Log book.", searchQuery)}
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {highlightSearchTerm(
                  "(Correction Memo 01/2021 of 20.01.2021).",
                  searchQuery
                )}
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p>
                <strong>Note:</strong>{" "}
                {highlightSearchTerm(
                  "Each Guard, Loco Pilot, Motorman and Assistant Loco Pilot should also be in possession of a watch in addition to the equipment prescribed.",
                  searchQuery
                )}
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.19 (vii)
              </h4>
              <p className="ml-6 mb-4">
                {highlightSearchTerm(
                  "Each Motormen shall have with him, while on duty, the following items in addition to those mentioned in GR 4.19.",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">(1)</span>{" "}
                  {highlightSearchTerm("Reverser Key.", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(2)</span>{" "}
                  {highlightSearchTerm("BL key", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(3)</span>{" "}
                  {highlightSearchTerm("BIV key (2 numbers)", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(4)</span>{" "}
                  {highlightSearchTerm("EMU Cab door key", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(5)</span>{" "}
                  {highlightSearchTerm("Walkie-talkie", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(6)</span>{" "}
                  {highlightSearchTerm(
                    "A red flashing hand signal lamp.",
                    searchQuery
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo. 03/2021 dated 25.08.2021).",
                      searchQuery
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">(7)</span>{" "}
                  {highlightSearchTerm("Crocodile clip", searchQuery)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(8)</span>{" "}
                  {highlightSearchTerm(
                    "EMU trouble shooting directory",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(9)</span>{" "}
                  {highlightSearchTerm("Rough Journal Book.", searchQuery)}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo No. 1 /2012 dated 09.03.2012)",
                      searchQuery
                    )}
                  </span>
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {highlightSearchTerm(
                  "(Correction Memo 01/2021 of 20.01.2021).",
                  searchQuery
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.20 - Manning of engine in motion */}
        <section id="4.20" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.20.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Manning of engine in motion:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "Except when otherwise provided by special instructions, no engine shall be allowed to be in motion on any running line unless the Loco Pilot as also the Assistant Loco Pilot are upon it.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "Subject to the provision sub-rule (3), in no circumstances shall a person other than the Loco Pilot or a railway servant duly qualified in all respects, drive an engine on any running line.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "If a Loco Pilot becomes incapacitated while the engine is in motion, the Assistant Loco Pilot, if duly qualified, may work the train to the next station cautiously and where the Assistant Loco Pilot is not duly qualified, he shall bring the train to a stop and send a message to the Station Master of the nearest station to make arrangements for a Loco Pilot to take over the train, and for so doing he may take the assistance of the Guard.",
                searchQuery
              )}
            </p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R.4.20 (i)
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "Diesel shunting engines working at stations/ yards will have only Loco Pilot (Shunting) without Assistant Loco Pilot.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "The Loco Pilot or any other authorized person can move engine in loco yards without a Assistant Loco Pilot.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "Where no Loco Pilots (Shunting) are employed, Assistant Loco Pilots in the absence of Loco Pilots, may be allowed to move engines in loco yards, provided they hold a certificate, signed by the competent authority declaring them fit to perform this duty.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(d)</span>{" "}
                  {highlightSearchTerm(
                    "Loco Pilots (Shunting) who hold the necessary certificate may be allowed to perform shunting inside station limits. Loco Pilots (Shunting) who hold certificates of competency as Loco Pilots may be allowed to work trains outside station limits.",
                    searchQuery
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    {highlightSearchTerm(
                      "(Correction Memo 3 dated 19.05.06)",
                      searchQuery
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">(e)</span>{" "}
                  {highlightSearchTerm(
                    "No Assistant Loco Pilot shall be permitted to act for a Loco Pilot (Shunting), unless he holds the certificate vide S.R.4.20 (i) (c).",
                    searchQuery
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4 text-base">
                S.R. 4.20(ii)
              </h4>
              <div className="ml-6 space-y-4">
                <p>
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "On single cab Diesel locomotives, the Loco Pilots during train working as well as shunting should work from the respective control stand towards the direction of train movement.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "On dual cab Diesel locomotives, the Loco Pilots during train working as well as shunting should work from the leading cab only.",
                    searchQuery
                  )}
                </p>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {highlightSearchTerm(
                  "(Correction Memo No.2/2015 to GRS dated 30.06.2015)",
                  searchQuery
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.21 - Driving an electric train */}
        <section id="4.21" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.21.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Driving an electric train:-
            </h3>
          </div>

          <div className="ml-16 space-y-6 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "In the case of electric trains, the Loco Pilot shall be in the leading driving compartment when the train is in motion or when the train is standing on any running line except as otherwise prescribed in these rules.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>
            </p>

            <div className="ml-6 space-y-4">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "In the case of a single or multiple unit train, if the driving apparatus in the leading driving compartment becomes defective, the train shall be driven cautiously from nearest driving compartment which is serviceable; in this event, the Guard shall travel in the leading driving compartment and shall convey the necessary signals to the Loco Pilot, the Guard shall also sound the horn or whistle as necessary and apply the brake in case of emergency and shall be responsible for stopping the train correctly at signals, stations and obstructions.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "In the case of an electric engine, if the leading driving compartment becomes defective, the train shall be driven from the trailing driving compartment by the Assistant Loco Pilot if he is duly qualified to drive and the Loco Pilot shall",
                  searchQuery
                )}
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <p>
                {highlightSearchTerm(
                  "remain in the leading driving compartment, and shall be responsible for the correct operation of the train.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.21 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "The rule GR 4.21 (1) and (2) (b) are applicable in case of diesel engine having twin cabs also. (Correction Memo No.2/2015 to GRS dated 30.06.2015)",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(ii)</span>{" "}
                {highlightSearchTerm(
                  "When setting back from one line to another or into a siding, the Loco Pilot need not change ends but when shunting on to another train or upto a buffer-stop, he shall always be in the leading driving compartment and driving forward.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(iii)</span>{" "}
                {highlightSearchTerm(
                  "In cases where the leading cab of an electric/diesel locomotive or electric multiple unit has become defective, the maximum speed shall be 40 kilometres an hour for electric/diesel locomotives, 30 kilometres an hour for Electric Multiple Unit stock except in cases where the brake equipment is inoperative from the leading driving cab in which contingency, the maximum speed shall not exceed 15 kilometers an hour.(Correction Memo No.02/2015 dated 30.06.2015)",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.22 - Riding on engine or tender */}
        <section id="4.22" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.22.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Riding on engine or tender:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No person other than the engine crew shall be authorized to ride on the engine or tender of a steam locomotive, except in accordance with special instructions.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "Except as may be permitted by special instruction, no person other than engine crew shall be authorized to enter any driving compartment of a single or multiple unit train or a train propelled by electric, diesel or petrol engine.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "No unauthorized person shall manipulate any apparatus contained therein.",
                searchQuery
              )}
            </p>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.22 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "The following persons may travel on the engine or tender or cab of Electric Multiple unit train, under the conditions stipulated for each:-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  {highlightSearchTerm(
                    "(a) Staff who are specially authorized by the other rules in this book or by instructions specially issued by the Divisional Railway Manager.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(b) Loco Pilots learning road under the authority.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(c) Traffic staff carrying out shunting operations.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm("(d) Officer on duty.", searchQuery)}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(e) Inspecting officials on duty authorized by a special pass or permit",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(f) Fitters and Chargemen of the workshop on a trial engine provided authority is given by the Chief Mechanical Engineer/Chief Workshop Engineer/Workshop Manager for diesel or steam Locos and by the Chief Electrical Engineer/Chief Electrical Loco Engineer/Chief Electrical General Engineer/Senior Divisional Elec. Engineer for electric Locos provided that the total number of such officials in the locomotive is restricted to four excluding the engine crew.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(g) On Electric Multiple Unit stock, only two persons other than the Motorman or the Guard are authorised to travel in the cab with special permits issued by the competent authority.",
                    searchQuery
                  )}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "Note:- 1. Except where otherwise provided specifically, not more than two persons other than the engine crew shall be allowed to travel on the Engine/Tender/cab. It is strictly prohibited for anyone to mount on tenders of engines on electrified sections.",
                  searchQuery
                )}
              </div>
              <p>
                <span className="font-semibold text-foreground">
                  S.R. 4.22 (ii)
                </span>{" "}
                {highlightSearchTerm(
                  "A Loco Pilot who is off duty is not permitted to enter or travel in any of the driving compartments or to use his reversing handle under any circumstances.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.23 - Brake-Vans */}
        <section id="4.23" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.23.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Brake-Vans:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No train shall be allowed to enter a block section, unless one or more brake-vans or hand braked vehicles are attached to it, except in emergency or as provided for under special instructions.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "This rule does not apply to rail cars, light engine or Light engines coupled together.",
                searchQuery
              )}
            </p>
            <div className="text-xs text-muted-foreground">
              {highlightSearchTerm(
                "Note:- Tower Wagons are exempted from the provision of rule 4.23(1)",
                searchQuery
              )}
            </div>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.23 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "No person, except officers of the railway, or persons holding brake-van passes or person specially permitted to do so, shall be allowed to travel in the brake-van. Railway Police officials may, in cases of emergency, be permitted to travel in the brake-van of goods trains.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.23 (ii)
                </span>{" "}
                {highlightSearchTerm(
                  "(a) In an emergency, goods trains can be worked without brake-van under the specific sanction of the Divisional Railway Manager in each case.",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(b) In case of an accident, a train can be worked to the nearest block station without brake-van where the train can be berthed without hindering the crossing or precedence of other trains under the orders of Divisional Railway Manager.",
                  searchQuery
                )}
              </p>
              <div>
                <p>
                  {highlightSearchTerm(
                    "(c) Running of goods trains without brake van is permitted provided the following safety precautions are taken:-",
                    searchQuery
                  )}
                </p>
                <div className="ml-6 space-y-2">
                  <p>
                    {highlightSearchTerm(
                      "(1) The train shall be fully vacuum / air braked and certified so by the JE/SE C& W or when JE/SE C& W is not available at the station the Loco Pilot and Guard shall ensure that brake pipes are connected from engine to the last vehicle and required Vacuum / Air pressure is created and ensure adequate brake power before starting.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(2) The Guard shall travel on the engine.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(3) The painted number of the last vehicle shall be intimated to the Controller by the Station Master on duty of the train starting station. The Controller shall ensure that he gets the painted number of the last vehicle from the Station Master before giving permission to start the train.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(4) Each Station Master on duty on the entire section shall intimate the painted number of the last vehicle to the Station Master on duty ahead while applying for Line Clear for the train and get acknowledgement, entering the same in the Train Signal Register.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(5) Tail Board or Tail Lamp shall be provided on the last vehicle and the train shall run at prescribed speed subject to other speed restrictions in force.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(6) The Guard and Loco Pilot shall keep a good look-out during run.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(7) When the train stops at a station for crossing or other purpose, the Station Master on duty shall verify the painted number of the last vehicle and communicate the same to Controller in confirmation of his verification. The Controller on duty shall confirm at each stoppage from the Station Master the number of the last vehicle on the train. (Correction Memo No. 04/2019 dated 18.11.2019)",
                      searchQuery
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.24 - Position of brake-van on train */}
        <section id="4.24" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.24.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Position of brake-van on train:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "Unless it be otherwise directed by special instructions, one brake-van shall be attached to the rear of the train, provided that reserved carriages or other vehicles may, under special instructions, be placed in rear of such brake-van.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R. 4.24 (i)
              </span>{" "}
              {highlightSearchTerm(
                "In the case of Mail, Express and Passenger trains worked with vacuum/ air pressure throughout not more than two bogies or their equivalent may be attached in rear of the rear brake-van subject to the condition that the vehicles are fitted with vacuum/ air brake in good working order.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "-wheeler), if fitted with hand brake in good working order, may also be attached in addition to two bogies or their equivalent as the last vehicle in rear of the brake-van of the Mail, Express and Passenger trains worked with vacuum /air brake throughout.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R. 4.24 (ii)
              </span>{" "}
              {highlightSearchTerm(
                "In the case of Mixed and Goods trains worked with vacuum/ air brake throughout, nor more than two bogies or their equivalent (4 four wheelers) may be attached in rear of the rear brake-van, subject to the condition that the vehicles or wagons are fitted with vacuum/ air brake in good working order.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.24 (iii)
              </span>{" "}
              {highlightSearchTerm(
                "One damaged vehicle, certified fit to run in the damaged condition by Train Examiner and accompanied by a competent railway servant not below the rank of a Carriage and Wagon Fitter shall, under special instructions, be attached in rear of the rearmost brake-van of a goods train, during day light hour only. Such stock shall be detached at a station where the time is 18.00 hours and the certificate handed over to the Station Master. This procedure is not permissible on Shencottah Punalur section where the damaged vehicle shall be conveyed by loading them on suitable trucks. (Correction Memo No. 01/2014 dated 14.07.2014)",
                searchQuery
              )}
            </p>
            <div>
              <p>
                <span className="font-semibold text-foreground">
                  S. R. 4.24 (iv)
                </span>{" "}
                {highlightSearchTerm(
                  "When vehicles are attached behind the rear brake-van of a train in terms of S. R. 4.24 (i) to (iii):-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  {highlightSearchTerm(
                    "(a) If the rearmost vehicle is provided with side lamps or brackets therefor, the side lamps shall be lighted on this vehicle, the side lamps of the brake-van being extinguished.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(b) If there is no provision for side lamps on the rearmost vehicle, the side lamps, if any, on the nearest vehicle thereto shall be lighted, the side lamps of the brake-van being extinguished.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(c) If there is no provision for side lamps on any of the vehicles attached in rear of the rear brake-van, the side lamps of the brake-van shall be used.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(d) In the case of clauses (b) and (c) of S. R. 4.24 (iv), the Guard shall specially look back frequently on the run and satisfy himself that all the vehicles attached in rear of the brake-van are following safely.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
            <p>
              <span className="font-semibold text-foreground">
                S. R. 4.24 (v)
              </span>{" "}
              {highlightSearchTerm(
                "When a passenger carrying carriage is attached as the last vehicle of a goods train in terms of S. R. 4.24 (ii), the carriage so attached shall be provided with side and tail lamps and the Guard shall see, at night or in thick, foggy or tempestuous weather, impairing visibility, that the side and tail lamps of the brake-van are extinguished and those on the last carriage are lighted.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.25 - Guards */}
        <section id="4.25" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.25.
            </span>
            <h3 className="font-semibold text-lg text-foreground">Guards:-</h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "Except under special instructions or in an emergency, every running train shall be provided with one or more Guards.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "The Guard of a running train shall travel in his brake-van, except-",
                searchQuery
              )}
            </p>
            <div className="ml-6 space-y-2">
              <p>
                {highlightSearchTerm("(a) in an emergency, or.", searchQuery)}
              </p>
              <p>
                {highlightSearchTerm(
                  "(b) Under special instructions.",
                  searchQuery
                )}
              </p>
            </div>
            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "When a train is worked without a Guard, such of his duties as can be performed by the Loco Pilot shall devolve on him as may be specified by special instructions.",
                searchQuery
              )}
            </p>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-foreground">S.R.4.25</span>{" "}
                {highlightSearchTerm(
                  "Running of Goods trains without Guard at normal speed (subject to other speed restriction in force):-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  {highlightSearchTerm(
                    "i) Running of passenger carrying trains without Guard should not be permitted.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "ii) Running trains without Guard should be avoided as far as possible. However, in exceptional circumstances, only goods trains may be run without Guard with the specific orders of Sr.DOM and a record of such orders shall be maintained in respective control office in a separate register.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "iii) Running of goods train without Guard should not be permitted if the last vehicle is not brake van.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "iv) In case, a train is run without Guard, such of the duties of the Guard as can be performed by the Loco pilot, shall devolve on the Loco pilot and Assistant Loco pilot.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "v) The following precautions should be taken in all such cases:-",
                    searchQuery
                  )}
                </p>
                <div className="ml-6 space-y-2">
                  <p>
                    {highlightSearchTerm(
                      "1) It should be ensured that the train is provided with continuous vacuum/air pressure from the engine to the rearmost vehicle, which may be a brake van, if no Guard is provided either at an intermediate point or the crew changing station. the Loco pilot on being informed by the Station Master, shall examine the brake power of the train and ensure that the rear most four pistons are in proper working order. Before signing the BPC, the Loco pilot shall ensure that the required amount of vacuum/air pressure is provided in the brake van. Vacuum gauge / air gauge shall be provided by the originating station.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "2) The duties of the Guard as laid down in Rules 4.34 (Duties of Guard when taking over charge of a train), 4.35 (Starting of trains), 4.36 (Guard to be in charge of train), 4.43 (Guard to keep a good look-out), 4.44 (Train held up at First Stop signal), 6.03 (Protection of trains stopped between stations), 6.06 (Train in a block section without authority to proceed), 6.08 (Train Parting) and 6.09 (Portion of train left in a block section) shall devolve on the Loco Pilot.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "3) The Loco Pilot shall be issued with Caution Order at the starting station specifying the non-provision of Guard for his train and requiring him to carry out the duties of a Guard. SCOR shall also be advised of the fact under exchange of private numbers who will inform the stations en route. The station Master on getting the train number, will inform the end cabins, where provided and Gatemen of all the LC gates enroute under exchange of private numbers.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "4) LV board and Tail lamp must be made available to the Loco pilot and it shall invariably be fixed to the last vehicle by the Loco Pilot and the completeness of the train and clearance of the fouling mark at stations shall be ensured as per extant rules, whenever the train stops for crossing or precedence.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "5) The Station Master of the block station controlling the IBS, on becoming aware that the train is running without Guard, shall not dispatch a train in rear of this train upto IBS unless the goods train without Guard reaches the station ahead.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "6) When the train stops at a station for crossing or other purpose, the Station Master on duty shall verify the painted number of the last vehicle and ensure the train has arrived complete and is standing clear of the fouling mark.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "7) During tempestuous weather, total interruption of communication and single line working on double line section, running of trains without Guard is strictly prohibited.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "8) Extra detonators should be carried by the Loco pilot who shall be responsible for protection of the train.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "9) When such a train is stopped between stations on account of accident, failure, obstruction or other exceptional cause and the Loco Pilot finds that the train cannot proceed further, he shall immediately protect the train as per G&SR 6.03. While going for protection, care shall be taken that loco is not deserted if it is on rails.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "10) In Automatic Block territory, no train shall be allowed to follow until the preceding train which has been allowed to run without Guard, has arrived complete at the next signal controlling station in advance.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "11) When a train running without Guard encounters vacuum/air pressure trouble enroute, the following steps are required to be taken by the Loco Pilot / Assistant Loco Pilot:-",
                      searchQuery
                    )}
                  </p>
                  <div className="ml-6 space-y-2">
                    <p>
                      {highlightSearchTerm(
                        "a) The Assistant Loco Pilot should check the complete train for any leakage, hose pipe disconnections etc., and attend to it. The help of C&W staff or Pointsman shall be taken when the vacuum/air pressure trouble occurs within station limits. The Assistant Loco Pilot shall keep a continuous look out which run through a station, to the rear and shall observe any danger signal shown by the station staff.",
                        searchQuery
                      )}
                    </p>
                    <p>
                      {highlightSearchTerm(
                        "b) The Assistant Loco Pilot should also ensure that all the cut-off angle cocks of air braked wagons are in open condition except the rear angle cock of rear most vehicle and the front angle cock of the train engine.",
                        searchQuery
                      )}
                    </p>
                    <p>
                      {highlightSearchTerm(
                        "c) The Assistant Loco Pilot should ensure the vacuum/air pressure continuity by operating the brake van valve/ cut off angle cock of the last vehicle.",
                        searchQuery
                      )}
                    </p>
                    <p>
                      {highlightSearchTerm(
                        "d) The Loco Pilot should regulate the speed of the train depending on the brake feel test conducted by him in the first block section. (Correction Memo No. 04/2019 dated 18.11.2019)",
                        searchQuery
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.26 - Couplings */}
        <section id="4.26" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.26.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Couplings:-
            </h3>
          </div>
          <div className="ml-16 text-justify">
            <p>
              {highlightSearchTerm(
                "No Vehicle that is not fitted with a coupling or couplings of approved pattern shall be attached to any train.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.27 - Cranes */}
        <section id="4.27" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.27.
            </span>
            <h3 className="font-semibold text-lg text-foreground">Cranes:-</h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No travelling crane shall be attached to a train until it has been certified by a duly authorised person that it is in proper running order, and with a dummy truck for the jib, if necessary.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "When a crane is to work on any line provided with electric traction or any line adjacent to it, the procedure and precautions as laid down under special instructions shall also be followed.",
                searchQuery
              )}
            </p>

            <div className="space-y-3 mt-6">
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.27 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "The duly authorised person is the parent depot official when the crane is moved out from the depot, or the Crane Supervisor for the return trip from the work spot.",
                  searchQuery
                )}
              </p>
              <div>
                <p>
                  <span className="font-semibold text-foreground">
                    S.R.4.27 (ii)
                  </span>{" "}
                  {highlightSearchTerm(
                    "(a) When attached to Goods trains and mixed trains with the passenger coaches brake-van. When attached to Mixed trains with goods wagons marshalled next to the engine, the crane shall be marshalled immediately in rear of the goods vehicles and in front of the passenger vehicles on the train. In the above cases, the crane shall be so attached as to have its jib trailing and the speed of the train shall not exceed 50 Kmph on the B.G. and 40 Kmph on the MG.",
                    searchQuery
                  )}
                </p>
                <p className="ml-6">
                  {highlightSearchTerm(
                    "(b) when proceeding for emergency relief operation to the accident site, the crane, with the jib leading, shall be attached next to the engine except when proceeding over sections having bridges where marshalling restrictions have been imposed by the engineering branch, in which case the formation of the break-down special is to be arranged at the home depot so as to conform to the restrictions.",
                    searchQuery
                  )}
                </p>
              </div>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.27 (iii)
                </span>{" "}
                {highlightSearchTerm(
                  "The Crane Supervisor shall, before starting to work a crane within station limits, give a written requisition to the Station Master, specifying the line on which the crane is to work and obtain from him a written permission authorizing him to commence operations. The Crane Supervisor shall before actually commencing the operation, not only be in possession of written permission, but also satisfy himself that arrangements have been made for the protection of any adjacent line which may be fouled by any part of the crane while in operation. The Station Master shall protect the crane. Crane working shall be stopped before any train is authorised to move on the adjacent line.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.27 (iv)
                </span>{" "}
                {highlightSearchTerm(
                  "No crane shall be worked near traction overhead equipment unless such equipment is made dead and earthed and the official in-charge of the crane is in possession of Form ETR. 3 and an authorised representative of the overhead equipment department is present.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.28 - Loading of Vehicles */}
        <section id="4.28" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.28.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Loading of Vehicles.
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No wagon or truck shall be so loaded as to exceed the maximum gross load on the axle fixed under sub-section (1) of section 72 of the Act, or such varied carrying capacity if any, as may have been prescribed by the Railway Administration under sub-section (4) of the said section.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "Except under approved special instructions, no vehicle shall be so loaded as to exceed the maximum moving dimensions prescribed from time-to-time by the Railway Board.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "When a load in a truck projects to an unsafe extent beyond the end of a truck, an additional truck shall be attached to act as a dummy.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(4)</span>{" "}
              {highlightSearchTerm(
                "The Guard shall, unless this duty is by special instructions imposed on some other railway servant, carefully examine the load of any open truck which may be attached to the train, and if any such load has shifted or requires adjustment, shall have the load made secure or the truck removed from the train.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.28 (i)
              </span>{" "}
              {highlightSearchTerm(
                "The maximum moving dimensions are:-",
                searchQuery
              )}
            </p>
            <div className="overflow-x-auto">
              <Table className="text-[13px] border border-border rounded-lg mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[240px]">Description</TableHead>
                    <TableHead className="text-center">
                      Broad gauge (Metre)
                    </TableHead>
                    <TableHead className="text-center">
                      Metre gauge (Metre)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="align-top">
                      {highlightSearchTerm(
                        "Height over all from level of rails at the centre",
                        searchQuery
                      )}
                    </TableCell>
                    <TableCell className="text-center align-top">
                      {highlightSearchTerm("4.265", searchQuery)}
                    </TableCell>
                    <TableCell className="text-center align-top">
                      {highlightSearchTerm("3.430", searchQuery)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="align-top">
                      {highlightSearchTerm(
                        "Height over all from level of rails at sites",
                        searchQuery
                      )}
                    </TableCell>
                    <TableCell className="text-center align-top">
                      {highlightSearchTerm("3.735", searchQuery)}
                    </TableCell>
                    <TableCell className="text-center align-top">
                      {highlightSearchTerm("3.200", searchQuery)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="align-top">
                      {highlightSearchTerm("Maximum width", searchQuery)}
                    </TableCell>
                    <TableCell className="text-center align-top">
                      <div>{highlightSearchTerm("3.250", searchQuery)}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {highlightSearchTerm(
                          "From 1.170m above rail level",
                          searchQuery
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center align-top">
                      <div>{highlightSearchTerm("2.740", searchQuery)}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {highlightSearchTerm(
                          "From 0.863m above rail level",
                          searchQuery
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-3 mt-6 text-justify">
              <p>
                {highlightSearchTerm(
                  "The following are the prescribed clearances from contact wire for the passage of Over Dimensional Consignments through electrified sections at 25 KV. AC and the special restrictions required:-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  {highlightSearchTerm(
                    "(i) Special speed restriction is not required when the gross clearance is more than 250mm.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(ii) Speed must be restricted to 15 kmph when the gross clearance is between 250 mm and 200 mm (ODCs would not be stopped under critical locations (i.e) where clearance is between 250mm and 200 mm).",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(iii) Speed must be restricted to 15 kmph and overhead power must be switched off, when the gross clearance is less than 200 mm.",
                    searchQuery
                  )}
                </p>
              </div>
              <p>
                {highlightSearchTerm(
                  "No consignment with less than 100 mm gross clearance from the overhead contact wire will be permitted in a 25 kV Electrified section.",
                  searchQuery
                )}
              </p>
              <div className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "(Correction Memo 03/2021 dated 25.08.2021)",
                  searchQuery
                )}
              </div>
            </div>

            <div className="space-y-3 mt-6 text-justify">
              <p>
                <span className="font-semibold text-foreground">
                  S.R 4.28 (ii)
                </span>{" "}
                {highlightSearchTerm(
                  "At station where Load Gauge have been erected. Station Masters shall personally see that all open wagons loaded with bulky articles are passed under the Load Gauges to test if the load in each case is within the maximum standard dimensions and if the load is excessive, it shall be reduced.",
                  searchQuery
                )}
              </p>
              <div>
                <p>
                  <span className="font-semibold text-foreground">(iii)</span>{" "}
                  {highlightSearchTerm(
                    "No vehicle loaded beyond the Standard Moving Dimensions, shall be despatched from a station without the permission of the Divisional Railway Manager who shall before granting such permission, refer the matter to the Principal Chief Operations Manager.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm(
                    "Loads infringing Standard Moving dimensions (I.S.M.D.) shall be moved by through trains and not by Shunting trains or Work trains. Shunting of trains with loads Infringing Standard Moving Dimensions (I.S.M.D.) shall be avoided as far as possible. The wagon containing the load shall be attached next to the engine. A train Examiner shall invariably accompany the load on the engine and also a Traffic Inspector or a Special Guard, if considered necessary. Specific sanction shall be obtained for movement of the load from the loading point right upto the destination.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm(
                    "The load shall be examined at intermediate stations during train engine change or where crew change is arranged or where stoppage is pre-arranged, by a responsible official not below the rank of a Head Train Examiner. The train/trains by which the load should be moved shall be nominated by the Control office. The consignment should be routed strictly by the authorised route.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm(
                    "At station where Train Examiners are employed, loads Infringing Standard Moving Dimensions (I.S.M.D.) shall be specially examined and certified before despatch. A JE/SSE/P.Way shall accompany the load in case the clearance of the load from fixed structures is less than 15 cms. on his section. Guard and Loco Pilot shall be clearly notified of all the conditions for the carriage of the load. The Guard before starting the train should contact the Controller on duty and inform him about the loads Infringing Standard Moving Dimensions being on train giving the number, position of the wagon and details of Train Examining staff accompanying the train.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm(
                    "A representative of the Traction Department shall accompany all loads infringing Standard Moving Dimensions (I.S.M.D.) having clearance as specified in items (ii) and (iii) of S.R.4.28 (i), to supervise safe movement of the loads Infringing Standard Moving Dimensions (I.S.M.D.) at locations where clearance from the contact wire is critical. A representative of the Traction Department should also accompany loads Infringing Standard Moving Dimensions (I.S.M.D.) having width more than 1981 mm. for Broad Gauge and 1910 mm. for Metre Gauge from centre line of track.",
                    searchQuery
                  )}
                </p>
              </div>
              <p>
                <span className="font-semibold text-foreground">
                  S. R. 4.28 (iv)
                </span>{" "}
                {highlightSearchTerm(
                  "The height of standards used as supports in open trucks loaded with bamboos, firewood, etc., shall not exceed the following heights:-",
                  searchQuery
                )}
              </p>
              <div className="overflow-x-auto">
                <Table className="text-[13px] border border-border rounded-lg mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[260px]"></TableHead>
                      <TableHead className="text-center min-w-[220px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Broad Gauge - 1,980 Meters",
                          searchQuery
                        )}
                      </TableCell>
                      <TableCell className="align-top" rowSpan={3}>
                        {highlightSearchTerm(
                          "From the floor of the wagon",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Metre Gauge - 1,830 Meters",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Narrow Gauge - 1,830 Meters",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="mt-4">
                {highlightSearchTerm(
                  "The load of the wagon at the centre shall not exceed the height of the standards.",
                  searchQuery
                )}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-foreground">
                  S. R. 4.28 (v)
                </span>{" "}
                {highlightSearchTerm(
                  "When the load in a truck on the Metre Gauge or Narrow Gauge, projects more than 45.7 centimetres beyond the truck and on the Board Gauge projects beyond the buffer castings, dummy trucks shall be used.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.29 - Damaged or defective vehicles */}
        <section id="4.29" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.29.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Damaged or defective vehicles:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "No vehicle which has been derailed shall run between stations, until it has been examined had passed by a competent Train Examiner; Provided that, in case of a derailment between stations, the Loco Pilot may, if the vehicle has been re-railed and if he considers it safe to do so, take such vehicle to the next station at a slow speed.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "If a Guard or Station Master has reason to apprehend danger from the condition of any vehicle on a train before it can be inspected by a Train Examiner, the Loco Pilot shall be consulted, and if he so requires, the vehicles shall be detached from the train.",
                searchQuery
              )}
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.29 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "In the event of any vehicle derailing, or meeting with an accident, no repairs, except those absolutely necessary, shall be carried out. No such vehicle shall be worked away from the station at which the accident took place or to which it has been brought for stabling from the accident spot except with the permission of the Divisional Railway Manager. The vehicle, before being moved with the permission of the Divisional Railway Manager, shall be examined and certified by the Train Examiner as fit to run.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(ii)</span>{" "}
                {highlightSearchTerm(
                  "When a vehicle has been detached from a train due to defect or damage, the nearest Train Examiner shall be advised. This vehicle shall be stabled and secured separately. Unnecessary shunting with or against this vehicle shall be avoided. The vehicle shall not be accepted again for traffic use or worked away from the station until certified for the purpose by the Train Examiner.",
                  searchQuery
                )}
              </p>
              <div>
                <p>
                  {highlightSearchTerm(
                    "(iii) A hot axle observed on a train formation is indicative of an impending derailment and is therefore, to be treated as an accident situation.",
                    searchQuery
                  )}
                </p>
                <p className="mt-2">
                  {highlightSearchTerm(
                    "The means of identification of hot axle have been separately advised to all staff concerned, through circulars, folders and other technical literature. The following action is to be adopted by station staff whenever a hot axle is detected on a running train.",
                    searchQuery
                  )}
                </p>
                <div className="ml-6 space-y-3 mt-2">
                  <div>
                    <p className="font-medium">
                      {highlightSearchTerm(
                        "1. On single Line Sections.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "a. At stations where signals are operated through centralized operation, the Station Master shall put back the departure signals to 'ON' and keep the signals at 'ON' by keeping the relevant slides/signal knob.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "b. In case a hot axle is detected after the loco of the train has already passed the despatch signal, the Station Master shall immediately attract the attention of the Guard by waving the red flag by day and red light by night in a wide arc left to right across the chest. Such waving of hand danger signal across the chest by all railway staff on duty shall be a clear indication to the Crew and Guard of the train that danger exists not on the permanent way but on the train itself.",
                        searchQuery
                      )}
                    </p>
                    <div className="text-xs text-muted-foreground ml-4">
                      {highlightSearchTerm(
                        "(Correction Memo No.01/2014 dated 14.07.2014)",
                        searchQuery
                      )}
                    </div>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "c. The Station Master shall advise the Gateman, if any, in the block section ahead to stop the train by waving the red flag by day and red light by night in a wide arc left to right across the chest.",
                        searchQuery
                      )}{" "}
                      <span className="text-xs text-muted-foreground">
                        {highlightSearchTerm(
                          "(Correction Memo No.03/2015 dated 01.07.2015)",
                          searchQuery
                        )}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      {highlightSearchTerm(
                        "2. On Double Line Sections.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "The station Master will follow the same sequence for the stoppage of the train formation on which a hot axle has been detected.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "In addition, the Station Master shall not give line clear to a train coming from the direction in which the train having the hot axle has gone into.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "In case a train from the opposite direction has already entered the block section, the gateman, if any on the block section, would be advised to stop such a train coming from the opposite direction and advise the Loco Pilot of the situation.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "The Loco Pilot of the train coming from the opposite direction, after being so advised, shall proceed cautiously at a speed governed by feasibility, proximity of the other line, any topographical constraints, in such a manner that he can always stop short of an obstruction caused by the derailment of the train on which a hot axle was detected.",
                        searchQuery
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      {highlightSearchTerm(
                        "3. On Electrified Sections.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "On Electrified sections the Station Master will also advise the Traction Power Controller and Traffic Controller simultaneously of a train formation having a hot axle not having been detected and when it is considered operationally safe, the traction power supply will be immediately switched off.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "If the train cannot be stopped by any means as mentioned above, then the Station Master in advance should be advised to stop and examine the train duly using the prescribed emergency signal bell code six pause one (000000-0). The Section Controller, Traction Power Controller also should be advised accordingly.",
                        searchQuery
                      )}
                    </p>
                    <p className="ml-4">
                      {highlightSearchTerm(
                        "After stoppage the Train examining staff or Guard and Loco Pilot should be advised to examine the train. In case it is decided by the Train Examining staff, or by the Loco Pilot that the Wagon or vehicle has to be detached for attention, the wagon or vehicle shall be detached accordingly.",
                        searchQuery
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section E. Precautions before starting Train */}
        <div className="pt-8 mt-8 border-t border-document-border">
          <h3 className="text-xl font-semibold text-foreground">
            E. Precautions before starting Train
          </h3>
        </div>

        {/* Rule 4.30 - Loco Pilot and Guard to examine notices before starting */}
        <section id="4.30" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.30.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Loco Pilot and Guard to examine notices before starting:-
            </h3>
          </div>
          <div className="ml-16 text-justify">
            <p>
              {highlightSearchTerm(
                "Every Loco Pilot and Guard before starting with a train shall examine the notices issued for their guidance, and ascertain there from whether there is anything requiring their special attention on that section of the railway over which they have to work.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.31 - Examination of trains before starting */}
        <section id="4.31" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.31.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Examination of trains before starting:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "When a train is examined by a Train Examiner at a station, the Station Master shall not give permission to start the train until he has received a report from such Examiner to the effect that the train is fit to proceed and has the prescribed brake power.",
                searchQuery
              )}
            </p>
            <div className="text-xs text-muted-foreground">
              {highlightSearchTerm(
                "Note: The report mentioned under GR 4.31 shall be in Form T/431.",
                searchQuery
              )}
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-foreground">
                  S. R. 4.31 (i)(a)
                </span>{" "}
                {highlightSearchTerm(
                  "At all train starting stations as well as at all train examining stations en route the Train Examiner on duty shall after examining a train, sign in the column provided in the brake power certificate and intimate the fitness of the train to the Station Master and removes the labels.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "When a vehicle has been detached from a train due to defect or damage, the nearest Train Examiner shall be advised. Such vehicle shall not be accepted again for traffic use until certified for the purpose by the Train Examiner.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  SR.4.31(ii)
                </span>{" "}
                {highlightSearchTerm(
                  "While examining any formation, in order to afford the necessary protection to the Train Examining staff, a large red flag or a board painted red and inscribed with the word 'STOP' shall be displayed by day and red lamps by night. No train shall be moved while these flags, boards or lamps are being displayed.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.32 - Examination of train by Loco Pilot */}
        <section id="4.32" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.32.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Examination of train by Loco Pilot:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "The Loco Pilot shall, before the commencement of the journey and after performing any shunting enroute, ensure-",
                searchQuery
              )}
            </p>
            <div className="ml-6 space-y-1">
              <p>
                {highlightSearchTerm(
                  "(a) that his engine is in proper working order,",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(b) that the coupling between the engine and the train is properly secured, and",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(c) that the head light and marker lights are prescribed in sub-rule (1) of Rule 4.14 are in good order, and these are kept burning brightly, when required.",
                  searchQuery
                )}
              </p>
            </div>
            <p>
              <span className="font-semibold text-foreground">SR 4.32 (i)</span>{" "}
              {highlightSearchTerm(
                "An engine crew shall couple and uncouple the locomotive at the train originating station, at any intermediate point of operational stabling or engine change or attaching/detaching of an additional dead / live loco and at station/yard where loco is required to be finally detached from the train for change of traction, marshalling convenience or any other operational purposes including detaching of additional dead/live locos.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "The term coupling/uncoupling connotes activities pertaining to stipulated procedures related to safe and correct attaching / detaching of loco or any other live or dead loco to / from the train and includes connection / disconnection / reconnection of relevant hose pipes/air pressure pipes.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "When the train originates in coaching yard or goods yard, the engine crew shall be assisted by traffic shunting staff if normally deployed at that station/yard.",
                searchQuery
              )}{" "}
              <span className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "(Correction Memo No. 4 / 2008 dated 02.09.08)",
                  searchQuery
                )}
              </span>
            </p>
          </div>
        </section>

        {/* Rule 4.33 - Examination of single and multiple units by Loco Pilot */}
        <section id="4.33" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.33.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Examination of single and multiple units by Loco Pilot:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "When coupling single or multiple units or coaches of any such units together, the Loco Pilot shall be responsible for observing that all electrical couplings are properly made. After all couplings have been made, the Loco Pilot while taking over the complete train shall satisfy himself that the control and power apparatus and brakes of the complete train are in proper and prescribed working order.",
                searchQuery
              )}
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-foreground">
                  S. R. 4.33(i)(a)
                </span>{" "}
                {highlightSearchTerm(
                  "The Station staff shall couple and uncouple units and Loco Pilot shall be responsible for seeing that the Electrical/Mechanical connections are properly made.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "The Loco Pilot shall be responsible for seeing that jumpers and hose pipes are replaced and properly secured in their dummy receptacles after uncoupling.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.34 - Duties of Guard when taking over charge of a train */}
        <section id="4.34" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.34.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Duties of Guard when taking over charge of a train:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "The Guard when taking over charge of a train shall satisfy himself, before the train is despatched-",
                searchQuery
              )}
            </p>
            <div className="ml-6 space-y-1">
              <p>
                {highlightSearchTerm(
                  "(a) that the train is properly coupled,",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(b) that the train is provided with the prescribed brake power,",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(c) that the train carries tail board or tail lamp and side lamps and that such lamps are lighted and kept burning brightly, when required,",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(d) that the appliance, if any, for communication between the Guard and the Loco Pilot, is in proper working order, and",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(e) generally that, as far as he can ascertain, the train is in a state of efficiency for travelling.",
                  searchQuery
                )}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {highlightSearchTerm(
                "Note:- Rules regarding the brake power to be provided on trains have been issued separately as Brake Power Rules. These rules shall be observed while working trains.",
                searchQuery
              )}
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-foreground">
                  S.R. 4.34(i)
                </span>{" "}
                {highlightSearchTerm(
                  "The Guard shall ensure that the conditions laid down in Rule 4.34 are complied with even at stations enroute whenever the composition of the train is altered or any other reason warrants such check.",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "Before giving the Starting Permission or after obtaining the Brake Power Certificate, the Guard of a train shall ensure that the train examiner has signed in the brake power certificate form that",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-1">
                <p>
                  {highlightSearchTerm(
                    "(1) The doors of all carriage and wagons are in proper working order and can be closed and fastened.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(2) Vestibules connections are properly secured, that doors, when necessary, are locked and bolted.",
                    searchQuery
                  )}
                </p>
              </div>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.34(ii)
                </span>{" "}
                {highlightSearchTerm(
                  "The Loco Pilot shall advise the nearest Train Examiner by telephone, particulars of any defect or failure noticed in the working of the vacuum/air brake, giving the number of the train, engine and vehicle or wagon on which the failure has occurred, with copy to the Train Examiner at the destination station of the train and the Power Controller / C&W controller. The Guard shall make a remark in the Combined Train Report, which shall be countersigned by the Loco Pilot.",
                  searchQuery
                )}
              </p>
              <div>
                <p>
                  <span className="font-semibold text-foreground">
                    S.R4.34(iii)
                  </span>{" "}
                  {highlightSearchTerm(
                    "The following conditions are to be fulfilled for attaching of goods stock in passenger trains.",
                    searchQuery
                  )}
                </p>
                <div className="ml-6 space-y-1">
                  <p>
                    {highlightSearchTerm(
                      "(a) Goods stock may be attached to run on passenger trains (except Mail and important Express trains) with strict adherence of marshalling orders of mixed trains after duly certified fit to run on passenger trains by the train examining staff.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(b) The maximum speed of such trains should not exceed 75 Kmph on Broad Gauge and 50/40 Kmph on Metre Gauge (refer. S.R.4.08 (1)). The Caution Order must be issued to the Loco Pilot instructing him not to exceed the above speed limits.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(c) Goods stock must be attached next to the engine unless the contents are livestock, explosives, dangerous or inflammable goods in which case these should be attached in the rear.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(d) On Metre gauge sections where the gradients are 1 in 100 or steeper, the mixed trains should be marshaled with the coaching vehicles next to the engine and goods vehicles attached in the rear of coaching vehicles.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(e) Vacuum piped vehicles must not be attached behind the rear brake van of a fully Vacuumed train. They may, however, be attached inside the rear brake van provided interference to electric connection is not caused.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(f) Train examiners at nominated stations should be advised in time to examine all goods stock attached to Passenger trains, even though the train to which they are attached is not ordinarily examined at that station. At these stations, this examination will be limited to the goods stock only and will be confined to a safe to run examination.",
                      searchQuery
                    )}
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <p>
                    {highlightSearchTerm(
                      "(g) On such sections where no C&W staff is provided at the terminal station; the C&W staff at originating station of mixed train will give the certificate for both outward and inward journey of the wagons whether loaded or empty indicating the terminal stations.",
                      searchQuery
                    )}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {highlightSearchTerm(
                      "Note- A four-wheeled coaching vehicle or goods wagon with vacuum brake may be attached to a passenger train either in front (next to the engine) or in rear of the train. However, when the engine has a bogie tender, at least two four-wheelers shall be attached between the tender and the first bogie vehicle or wagon. In the case of an engine with six-wheeled tender, this restriction does not apply.",
                      searchQuery
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <p>
                  <span className="font-semibold text-foreground">
                    S.R.4.34(iv)
                  </span>{" "}
                  {highlightSearchTerm(
                    "Four-wheeler vehicles or wagons with a rigid wheel base of 3 metres or less shall not, under any circumstances, be attached to passenger trains. When such wagons or vehicles are to be attached to mixed or goods trains, the maximum speed of such trains shall not exceed 40 kilometres an hour.",
                    searchQuery
                  )}
                </p>
                <div>
                  <p>
                    <span className="font-semibold text-foreground">
                      S.R.4.34(v)
                    </span>{" "}
                    {highlightSearchTerm(
                      "A single unit wagon/vehicle shall not be attached between two bogie wagons/vehicles.",
                      searchQuery
                    )}
                  </p>
                  <div className="text-xs text-muted-foreground ml-6">
                    <p>
                      {highlightSearchTerm(
                        "Note a) This restriction does not apply to attaching of steam, diesel or electric locomotives in rear of Brake Van of Goods Trains for banking purposes.",
                        searchQuery
                      )}
                    </p>
                    <p>
                      {highlightSearchTerm(
                        "b) It is permissible to attach a single 4 Wheeler Brake Van between Train Engine and a Bogie wagon in Goods Trains for placement/withdrawal of rakes to/from Sidings to avoid delay in shunting , duly observing other necessary precautions .",
                        searchQuery
                      )}{" "}
                      <span className="ml-1">
                        {highlightSearchTerm(
                          "(Correction Memo 03/2022 dated 12.08.2022)",
                          searchQuery
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.35 - Starting of trains */}
        <section id="4.35" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.35.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Starting of trains.-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <div className="ml-0 space-y-1">
              <p>
                {highlightSearchTerm(
                  "(1) Loco Pilot shall not start his train from a station without the authority to proceed. Before starting the train, he shall satisfy himself that all correct fixed signals and, where necessary, hand signals are given and the line before him, is clear of visible obstructions and the Guard has given the signal to start. Guard shall see, before giving the starting signal, that all is right for the train to proceed.",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(2) The Station Master and Guard may be assigned any role or duty to ensure the safety in the manner as specified by special instructions.",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(3) The Guard shall not give the signal for starting unless he has satisfied himself that, except in accordance with Special Instructions, no person is travelling in any compartment of vehicle or roof of the vehicle not intended for the use of passengers.",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(4) In case of any travelling in contradiction to Sub-rule (3), the Guard, Loco Pilot or Assistant Loco Pilot shall take help, if necessary, from Government Railway Police, Railway Protection Force and Station Staff to remove the unauthorized person from the compartment of vehicle or roof of the vehicle. permission to start a train, that all is right for the train to proceed.",
                  searchQuery
                )}
              </p>
              <div className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "(Ref - ED/Safety- y (A&R)/19/17 dated 14.03.2022) (Correction Memo No. 02/2022 dated 12.05.2022)",
                  searchQuery
                )}
              </div>
            </div>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.35 (i)
              </span>{" "}
              {highlightSearchTerm(
                "At stations at which trains have a long halt the departure warning bell shall be rung five minutes before any train carrying passengers is due to start.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.35 (ii)
              </span>{" "}
              {highlightSearchTerm(
                "At all stations, before despatching a train, the Station Master shall ensure that all the works in connection with the train is completed. In the case of trains carrying mail, the Station Master shall also ensure that the mail work is over. At stations with refreshment rooms, Passengers should be warned by means of the warning bell before getting a train despatched.",
                searchQuery
              )}{" "}
              <span className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "(Correction Memo No. 02/2022 dated 12.05.2022)",
                  searchQuery
                )}
              </span>
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S. R 4.35 (iii)
              </span>{" "}
              {highlightSearchTerm(
                "The Guard, after ensuring that the train is ready to start, shall give the permission by blowing his whistle and exhibiting starting signal to the Loco Pilot, by day, a green flag and, by night, a green light waved from side to side overhead. The starting signal shall also be given by the Guard when a train has to be re-started after stopping outside station limits, for any reason. It shall be given at stations normally on the platform side. However, at stations where it cannot be seen by the Loco Pilot due to curve, overhead structure etc., it shall be given on the side where it can be seen well.",
                searchQuery
              )}{" "}
              <span className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "(Correction Memo No. 02/2022 dated 12.05.2022)",
                  searchQuery
                )}
              </span>
            </p>
            <p>
              <span className="font-semibold text-foreground">(iv)</span>{" "}
              {highlightSearchTerm(
                "Walkie-Talkie sets should not be used as an alternative to or replace physical exchange of signals. However, in case of full length trains, Walkie-Talkie sets may be used for exchange of signals between Loco Pilot and Guard when it is NOT possible to exchange signals physically due to curvature or other obstructions and the conditions for exchange of the starting signal have been fulfilled. In such a case, the Loco Pilot and Guard while using the Walkie-Talkie shall clearly mention their identity along with the Train number while communicating and also confirm the identity of speaker at the other end.",
                searchQuery
              )}{" "}
              <span className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "(Ref: Rly Board Lr. No.2009/Safety (A&R)/19/29 dt 10.03.2010)",
                  searchQuery
                )}
              </span>
            </p>
          </div>
        </section>

        {/* Rule 4.36 - Guard to be in charge of train */}
        <section id="4.36" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.36.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Guard to be in charge of train:
            </h3>
          </div>
          <div className="ml-16 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "After the engine has been attached to a train, and during the journey, the Guard or (if there be more than one Guard) the Head Guard shall be in-charge of the train in all matters affecting stopping or movement of the train for traffic purposes. In the case of any self-propelled vehicle, such as a motor coach without a trailer and unaccompanied by the Guard, the duties of a Guard shall devolve on the Loco Pilot.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.36 (i)
              </span>{" "}
              {highlightSearchTerm(
                "If there is more than one Guard in the train, the senior Guard shall be in-change of the train.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">(ii)</span>{" "}
              {highlightSearchTerm(
                "Guards shall report to the Station Master of the next station, any stoppage or the irregularities in train working caused by defects in works under the Engineering Branch, such as defective tracks, crossings, points, gates not opened, etc., and the Station Master shall telephone the report at once to the Divisional Operations Manager, the Divisional Engineer, Assistant Engineer and JE/SSE/P.Way.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.37 - Subordination of Guards in station limits */}
        <section id="4.37" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.37.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Subordination of Guards in station limits:
            </h3>
          </div>
          <div className="ml-16 text-justify">
            <p>
              {highlightSearchTerm(
                "When a train is within Station limits, the Guard shall be under the orders of the Station Master.",
                searchQuery
              )}
            </p>
          </div>
        </section>
        {/* Rule 4.38 - Assistant Loco Pilots to obey Loco Pilots */}
        <section id="4.38" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.38.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Assistant Loco Pilots to obey Loco Pilots:
            </h3>
          </div>
          <div className="ml-16 text-justify">
            <p>
              {highlightSearchTerm(
                "The Assistant Loco Pilots shall obey the lawful orders of their Loco Pilots in all particulars.",
                searchQuery
              )}
            </p>
          </div>
        </section>
      
        {/* Rule 4.39 - Loco Pilot to obey certain orders */}
        <section id="4.39" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.39.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Loco Pilot to obey certain orders:
            </h3>
          </div>
          <div className="ml-16 space-y-2 text-justify">
            <p>
              {highlightSearchTerm(
                "After an engine has been attached to a train and during the journey, the Loco Pilot shall obey-",
                searchQuery
              )}
            </p>
            <div className="ml-6 space-y-1">
              <p>
                {highlightSearchTerm(
                  "(a) the orders of the Guard, in all matters affecting the starting, stopping or movement of the train for traffic purposes, and",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(b) all orders given to him by the Station Master or any railway servant acting under special instructions, so far as the safe and proper working of his engine will admit.",
                  searchQuery
                )}
              </p>
            </div>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.39 (i)
              </span>{" "}
              {highlightSearchTerm(
                "From the time an engine enters the traffic yard till it leaves the traffic yard, the Loco Pilots are under the orders of the Station Master.",
                searchQuery
              )}
            </p>
          </div>
        </section>
        <div className="pt-8 mt-8 border-t border-document-border">
          <h3 className="text-xl font-semibold text-foreground">
            F. Duties of Staff Working Trains during Journey
          </h3>
        </div>

        {/* Rule 4.40 - Loco Pilot and Assistant Loco Pilot to keep a good look-out */}
        <section id="4.40" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.40.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Loco Pilot and Assistant Loco Pilot to keep a good look-out
            </h3>
          </div>
          <div className="ml-16 text-justify">
            <p>
              {highlightSearchTerm(
                "Every Loco Pilot shall keep a good look - out while the train is in motion, and every Assistant Loco Pilot shall also do so when he is not necessarily otherwise engaged.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.41 - Loco Pilot and Assistant Loco Pilot to look back */}
        <section id="4.41" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.41.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Loco Pilot and Assistant Loco Pilot to look back
            </h3>
          </div>
          <div className="ml-16 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "The Loco Pilot and or the Assistant Loco Pilot shall look back frequently during the journey to see whether the train is following in a safe and proper manner.",
                searchQuery
              )}
            </p>
            <div>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.41 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "At night, the Loco Pilot and the Assistant Loco Pilot shall frequently look back on the run and see that the side-lamps of the train are burning. They shall pick up at least one of the two side lamps burning. If both the side-lamps are suspected to be out, the Loco Pilot shall call the attention of the Guard by giving two short whistles. If the train is complete but only the side-lamps are not burning, the Guard shall exhibit Proceed hand signal to the Loco Pilot and proceed normally. If the Guard suspects that the train may have parted, he shall act in accordance with Rule 6.08. If the Loco Pilot does not receive the Proceed hand signal, he shall suspect that the train may have parted and act in accordance with Rule 6.08. If the train is complete but both the side-lamps are not burning, the Guard shall, if necessary, show a Proceed signal, to the Loco Pilot until lamp is relit or rectified.",
                  searchQuery
                )}
              </p>
            </div>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.41 (ii)
              </span>{" "}
              {highlightSearchTerm(
                "The Loco Pilots/Assistant Loco Pilots after passing permanent way gangs working on the line or a manned level crossing gate to see whether any danger signal is being exhibited by them as a warning of a danger/unusual thing on the train and to take necessary action.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.42 - Exchange of signals between Loco Pilot, Guard and Station Staff */}
        <section id="4.42" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.42.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Exchange of signals between Loco Pilot, Guard and Station Staff:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) The Loco Pilot and the Guard of a train shall exchange signals with each other, at such times and in such manner as maybe prescribed by special instructions.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) The Loco Pilot and the Guard of a train shall, while running through a station, look-out for the 'All Right' signals which the Station Master and such other staff at the station as may be specified by special instructions shall give if the train is proceeding in a safe and proper manner. If the train is not proceeding in a safe and proper manner, the Station Master or the other staff shall exhibit a Stop hand signal, on receipt of which the Guard and the Loco Pilot shall take immediate steps to stop the train.",
                searchQuery
              )}{" "}
              <span className="text-xs text-muted-foreground">
                {highlightSearchTerm(
                  "Note. See Rule 2.11 Proviso.",
                  searchQuery
                )}
              </span>
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.42 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "The signal is given by holding out the green flag horizontally by day and by waving a green light horizontally by night.",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-1">
                <p>
                  {highlightSearchTerm(
                    "(a) 'All Right' signal shall, as a rule, be exhibited by the platform duty staff and cabin crew on both sides of a train.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(b) Cabins in large yards, where frequent shunting is performed, shall not exhibit any flag or light to trains running through when there is nothing wrong with the train. Should, however, they find anything wrong with the train, they must display danger signal to Loco Pilot and the Guard of the train. While running through station, the Guard must appear at the door or on the veranda of the brake van and watch for such signals.",
                    searchQuery
                  )}
                </p>
                <div className="text-xs text-muted-foreground">
                  {highlightSearchTerm(
                    "Note. The roll of Station/Cabin staff for the purpose of exchange of 'All Right' signal with the train crew shall be mentioned in the Station working Rules of the concerned station. This shall be advised to all stations/Depots where Loco Pilots and Guards are Headquartered. All other staff shall not exhibit 'All Right' signals.",
                    searchQuery
                  )}
                </div>
              </div>
              <div className="ml-0 space-y-2">
                <p>
                  <span className="font-semibold text-foreground">
                    S.R.4.42 (ii) (a)
                  </span>{" "}
                  {highlightSearchTerm(
                    "When a train is running through a station having no cabin or one central cabin or both end cabins located on the station house side, the platform duty Station Master and a member of platform duty staff shall exchange 'All Right' signal on both sides of the train if all is right for the train to continue its journey. Otherwise a danger signal shall be shown.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "At stations where both the cabins or at least one Cabins are/is located on the opposite side of the Station house, the 'All Right' signal shall be exchanged by the Station Master/Cabinman on the other side of the train if all is right of the train to continue the journey otherwise a danger signal shall be shown.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "At stations where there is no Cabin on the off side and where there is only a Group 'D' staff is available besides the Station Master on duty at the platform, the Station Master shall exchange 'All Right' signal on the station side while the staff on duty shall exchange 'All Right' signal on the off side.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(d)</span>{" "}
                  {highlightSearchTerm(
                    "The Station Master on duty after exchanging All-Right signal with the crew and Guard of the train shall make an endorsement in the remarks column of the TSR to the effect that he/she has exchanged All-Right signal for the train. If for any valid reason the SM is not able to exchange All-Right signal with the Loco Pilot or the Loco Pilot and the Guard of a run through train, he/she shall record the reason in the TSR.",
                    searchQuery
                  )}{" "}
                  <span className="text-xs text-muted-foreground">
                    {highlightSearchTerm(
                      "(Correction Memo No.03/2016 dated 06.10.2016)",
                      searchQuery
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">(e)</span>{" "}
                  {highlightSearchTerm(
                    "While running through the Station, the Loco Pilot / Assistant Loco Pilot and Guard shall be on the lookout for such signals, which shall be acknowledged by them by repeating the same. In addition, the Loco Pilot / Assistant Loco Pilot shall also give a long whistle/horn as acknowledgement.",
                    searchQuery
                  )}
                </p>
                <div className="text-xs text-muted-foreground ml-6">
                  <p>
                    {highlightSearchTerm(
                      "Note: (1) Loco Pilot while working trains with maximum permissible speed above 110 kmph may depute his Assistant Loco Pilot to do above duties.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(2) In case of Train Set (like Vande Bharat), while passing through a station, the Guard and Loco Pilot shall switch on the built-in red light/Signal exchange light at the trailing and leading cabs. It will serve the purpose of exchange of Signals with Station staff.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(3) If built-in flickering Signal exchange light is not available or is defective, LED based flashing tri-colour hand signal lamp shall be used.",
                      searchQuery
                    )}{" "}
                    <span className="ml-1">
                      {highlightSearchTerm(
                        "(Correction Memo No.02/2023 dated 26.02.2023)",
                        searchQuery
                      )}
                    </span>
                  </p>
                </div>
                <p>
                  <span className="font-semibold text-foreground">(f)</span>{" "}
                  {highlightSearchTerm(
                    "When a train either stopping or non-stopping has passed a station inclusive of a train halt, the Loco Pilot / Assistant Loco Pilot and the Guard shall look back and satisfy themselves that no danger signal or other indication is given by any of the station staff. After doing so, the Loco Pilot/Assistant Loco Pilot shall exchange 'All Right' signal and a long whistle with the station staff after the train has passed the platform and before the engine passes the station limits.",
                    searchQuery
                  )}
                </p>
                <div className="text-xs text-muted-foreground ml-6">
                  <p>
                    {highlightSearchTerm(
                      "Note: (1) Loco Pilot while working trains with maximum permissible speed above 110 kmph may depute his Assistant Loco Pilot to do above duties.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(2) In case of Train Set (like Vande Bharat), while passing through a station, the Guard and Loco Pilot shall switch on the built-in red light/Signal exchange light at the trailing and leading cabs. It will serve the purpose of exchange of Signals with Station staff.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "(3) If built-in flickering Signal exchange light is not available or is defective, LED based flashing tri-colour hand signal lamp shall be used.",
                      searchQuery
                    )}{" "}
                    <span className="ml-1">
                      {highlightSearchTerm(
                        "(Correction Memo No.02/2023 dated 26.02.2023)",
                        searchQuery
                      )}
                    </span>
                  </p>
                </div>
                <p>
                  <span className="font-semibold text-foreground">(g)</span>{" "}
                  {highlightSearchTerm(
                    "If the Station Master on duty fails to exchange All-Right signal with the crew and Guard of a run through train, the Loco Pilot and Guard of the train shall exercise extra caution to ensure that all is right for the train to run through and record the same in their rough journal.",
                    searchQuery
                  )}{" "}
                  <span className="text-xs text-muted-foreground">
                    {highlightSearchTerm(
                      "(Correction Memo No.03/2016 dated 06.10.2016)",
                      searchQuery
                    )}
                  </span>
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>
                    {highlightSearchTerm(
                      "Note. In case the Station Master on the platform side fails to exchange 'All Right' signal, the same shall be exchanged from the off side after the last vehicle has passed the platform.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "If the Loco Pilot and/or the Guard fails to exchange 'All Right' signal with the Station Master on duty, the Station Master shall verify with the staff on the off side/Cabin and if it is known that the engine crew and/or the Guard failed to do so, action shall be taken to stop the train at the next block station, treating it as a runaway train. The block section in rear shall not be cleared until it is ascertained that everything is all right and the train may be allowed to proceed further.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    {highlightSearchTerm(
                      "Note. If the Loco Pilot and/or his Assistant Loco Pilot fails to exchange signal at a station in single line token area, action under S. R. 4.42 (iii) (a) need not be taken provided exchange of token had been done by the crew properly. However, the Station Master shall report the matter to the Station Master at the requisite block station who shall issue a warning message to the Loco Pilot of the train about his failure to observe the rules.",
                      searchQuery
                    )}
                  </p>
                </div>
                <p>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "If the station Master/Staff on Off side/Cabin observes or is informed by the staff anything unusual during the passage which may affect the Safety of the train (such as Goods falling off, vehicle on fire, hot axle or anything which is likely to foul or obstruct the Railway line) he should attract the attention of the crew and Guard to stop the train and examine the same. When the Station Master has not been able to stop the train, he shall advise the Station Master in advance to stop and examine the train.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "If the Station Master feels that some part of the vehicle or any other article might have fallen off before the train has arrived at his station, he shall advise the Station Master in rear also. When such action has been taken similar precautions should be taken for running trains between his station and the station in advance or in rear. The Station Master at either end of the block section shall not allow any train on the same line or on the adjacent line (when it is likely to be obstructed) until safe passage of trains is ensured.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(d)</span>{" "}
                  {highlightSearchTerm(
                    "If the Loco Pilot/Assistant Loco Pilot notices anything unusual with his train, he shall stop the train and ascertain the cause.",
                    searchQuery
                  )}
                </p>
                <p>
                  <span className="font-semibold text-foreground">(e)</span>{" "}
                  {highlightSearchTerm(
                    "While starting after stopping outside Station limits- Before re-starting the train the Guard shall then give the usual starting signal [see S.R.4.35 (iv)] and the Loco Pilot shall acknowledge it by giving one long one short whistle and start the train. After the train has started, the Guard shall, after satisfying himself that everything is all right, ...",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 4.43 - Guard to keep a good look-out */}
        <section id="4.43" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.43.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Guard to keep a good look-out:-
            </h3>
          </div>
          <div className="ml-16 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "During the journey including halts at stations, every Guard shall keep a good look-out and satisfy himself from time-to-time that the tail board and brake-van lamps, are in position and that all brake-van lamps, where required, are burning brightly, that the train is complete in every respect and is proceeding in a safe and proper manner.",
                searchQuery
              )}
            </p>
            <div className="text-xs text-muted-foreground">
              {highlightSearchTerm(
                "Note. - S.R.4.43 (i) If any vehicles are attached in rear of his brake-van in terms of Rule 4.24, the Guard shall ensure that the train is complete with such vehicles, on the run.",
                searchQuery
              )}
            </div>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.43 (ii)
              </span>{" "}
              {highlightSearchTerm(
                "When passing a manned level crossing, the Guard shall look back to see if any signal is given by the Gateman to indicate that anything is wrong with the train.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.43 (iii)
              </span>{" "}
              {highlightSearchTerm(
                "Guards of running trains will be responsible to watch any train passing on the adjacent line, and to attract the attention of the Guard or the Loco Pilot of the latter train by exhibiting danger hand signal should any condition be noticed on that train which may endanger its safety. In case of trains running in opposite directions, as on double line, the Guards of the two trains will exchange All right signal after having ensured their own train is safe.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.44 - Train held up at First Stop signal */}
        <section id="4.44" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.44.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Train held up at First Stop signal:-
            </h3>
          </div>
          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) When a train has, without an apparent cause, been kept standing at the First Stop signal for five minutes, the Loco Pilot shall sound the prescribed code of whistle to warn the Guard, and the Brakesman shall proceed to the cabin or station to warn the Station Master. If there is no Brakesman, the Loco Pilot shall depute Assistant Loco Pilot to proceed to the cabin or station to warn the Station Master. The Brakesman or Assistant Loco Pilot proceeding to the cabin or station shall show a Stop hand signal towards the station. The Guard shall, as soon as the train is stopped at the first Stop signal, check-up that the tail board or tail lamp is correctly exhibited and shall maintain a vigilant attitude in rear of the train. After fifteen minutes or such lesser time as may be prescribed by special instructions, the Guard shall, irrespective of whether the cause is apparent or not, proceed to protect the rear of the train in accordance with Rule 6.03. When the cause of detention is removed and the Loco Pilot has received permission to start, he shall sound the prescribed code of whistle to recall the Guard and exchange hand signal with him before starting the train.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) In the case of a train not accompanied by a Guard, these duties shall devolve on the Loco Pilot.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.44 (i)
              </span>{" "}
              {highlightSearchTerm(
                "After stopping his train at the First Stop signal, the Loco Pilot shall give one long whistle (continuous) to warn the Station Master. If after the lapse of 5 minutes, the signal is still at danger without apparent cause the Loco Pilot shall give two long, two short whistle to warn the Guard. The Guard shall in consultation with the Loco Pilot, send the Brakesman /Assistant Loco Pilot to the station or cabin to inform the Station Master. After informing the Station Master the man may remain in the station or in cabin if the signals are going to be taken 'Off' shortly. If the train is likely to be detained at the signal for a considerable period, the Station Master shall send a written memo, through the Brakesman /Assistant Loco Pilot stating what further detention is necessary and the reason therefor. The Brakesman /Assistant Loco Pilot shall go to the train and show this memo to the Loco Pilot who shall initial it and pass it on to the Guard, who shall retain it. In the case of a light engine, the Loco Pilot shall retain the memo. Whenever a memo is given by the Station Master, the Guard and Loco Pilot shall send a special report along with the Combined Train Report. If the stoppage of the train exceeds 15 minutes, the Guard/the Loco Pilot in the case of a light engine, shall proceed to protect the rear of the train in accordance with the instructions laid down in Rule 6.03.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.45 - Attracting attention of Loco Pilot */}
        <section id="4.45" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.45.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Attracting attention of Loco Pilot:-
            </h3>
          </div>
          <div className="ml-16 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) If any Guard sees reason to apprehend danger or considers it necessary for any reason to stop the train, he shall use his best endeavours to attract the attention of the Loco Pilot.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) In the absence of the means of communication with the engine, a Guard desiring to attract attention shall apply his hand brake sharply and as suddenly release it, and wherever possible, he shall reverse the side lamps to show red towards the engine.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(3) When the attention of the Loco Pilot has been attracted, the necessary hand signals shall be shown.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(4) If the train is fitted with continuous brake, the Guard may, in case of emergency, apply such brake gradually to stop the train.",
                searchQuery
              )}
            </p>
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.45 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "The Guard shall not apply the automatic vacuum brake, except when absolutely necessary and when applying it, he shall pull the lever slowly and gradually so as to reduce the vacuum by 12 to 18 centimetres only. Whenever the automatic vacuum brake is applied, the Guard shall send a special report along with the Combined Train Report.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(ii)</span>{" "}
                {highlightSearchTerm(
                  "The Loco Pilot shall, whenever he notices the reduction of vacuum, take immediate measures to bring the train to a stand clear, if possible of tunnels, bridges, cuttings, Catch siding points or other unsuitable spots of a similar nature. He shall also give two short and one long whistle and repeat it until the Guard shown the red flag by day and the red light by night, which is an indication that the Guard has understood the situation. The Guard shall then take necessary action in accordance with S.R.4.18 (ii).",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Rule 4.46 - Code of whistle/communication */}
        <section id="4.46" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.46.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Code of whistle / communication:-
            </h3>
          </div>
          <div className="ml-16 space-y-2 text-justify">
            <p>
              {highlightSearchTerm(
                "The Loco Pilot shall, when necessary to attract the attention of the Guard, sound the prescribed code of whistle, if necessary, repeatedly, or, if a brake whistle is provided, sound such whistle and shall also use other means of communication, if provided between the Loco Pilot and the Guard.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.46 (i)
              </span>{" "}
              {highlightSearchTerm(
                "When the Loco Pilot of a train requires the Guard to apply brakes, he shall give three short whistles. When he requires the Guard to release brakes, he shall give one long one short whistle.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.47 - Hand brakes */}
        <section id="4.47" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.47.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Use of hand brakes:-
            </h3>
          </div>
          <div className="ml-16 space-y-2 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) When the Loco Pilot sounds the prescribed code of whistle or the brake whistle, the Guards shall immediately apply their hand brakes.",
                searchQuery
              )}
            </p>
            <p>
              {highlightSearchTerm(
                "(2) When a train is travelling down a steep incline, the Guards shall, if necessary to steady the train, assist the Loco Pilot with their hand brakes.",
                searchQuery
              )}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                S.R.4.47 (i)
              </span>{" "}
              {highlightSearchTerm(
                "Hand brakes shall be put on gradually, but not so tightly as to skid the wheels as skidding not only reduces the resistance which the brake is intended to cause but also damages the wheels and rails. Brakes once applied shall not be slackened until the wheels get locked and begin to skid, when the brakes shall be eased sufficiently to prevent skidding. Hand brakes once put on, shall not be released until the Loco Pilot gives one long and one short whistle for releasing the brakes. Except in an emergency, Guards shall not apply their hand brakes to steady the speed of a train unless called upon to do so by the Loco Pilot. Brakesman shall also immediately apply the hand brakes when the Loco Pilot calls for brakes.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.48 - Permission of Guard to detach engine from train */}
        <section id="4.48" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.48.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Permission of Guard to detach engine from train:-
            </h3>
          </div>
          <div className="ml-16 space-y-3 text-justify">
            <p>
              {highlightSearchTerm(
                "When a train has been brought to stand outside station limits or anywhere on a grade, the Loco Pilot shall not detach his engine from the train without the permission of the Guard who, before giving such permission, shall satisfy himself that the van-brakes have been put on securely and take such other measures as may be necessary or prescribed by special instructions. Provided that detaching of engines from trains in such cases may be prohibited altogether under special instructions wherever considered necessary in the interest of safety.",
                searchQuery
              )}
            </p>
            <div>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.48 (i)
                </span>{" "}
                {highlightSearchTerm(
                  "The engine of a train carrying passengers shall not be detached or the train parted in section except in an emergency as given below:- Whenever it is necessary to detach the engine of a train carrying passengers for testing a bridge or for isolating a burning coach or coaches on a train carrying passengers, the following precautions shall be taken before the engine is detached or train parted",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-1">
                <p>
                  {highlightSearchTerm(
                    "(a) Hand brakes in the Guard's brake-van at the rear and in the brake-van wherever provided shall be securely screwed on,",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(b) Hand brakes of any goods wagons on the train shall be securely pinned down,",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(c) Hand brakes if provided on any coaching vehicle shall be securely applied,",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(d) Wooden wedges or sprags available in the brake-van shall be securely jammed under the farther most wheels of the rakes in the direction of the falling gradient. Vacuum shall be created to the maximum extent possible by blowing up with the large ejector/exhauster and attempt shall be made to lightly pull or push the load with the engine in the direction of the falling gradient. Only after it had been ensured that the load is securely restrained against movement, will the vacuum be dropped and the engine detached. The interval from the time engine is detached to the time it is again attached to the train shall not exceed 45 minutes.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(e) On the Ghat/Gradient section, locomotives shall not be detached from trains between stations.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "(f) In the case of fire, when it is necessary to isolate a burning coach and where the precautions as in S.R.4.48 (i) (d) cannot be undertaken in detail, the Guard and the Loco Pilot of the train will be responsible for using the wedges supplied in the brake-van to the best advantage in order to prevent parts of the train colliding against each other by running away.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
            <div>
              <p>
                <span className="font-semibold text-foreground">
                  S.R.4.48 (ii) (a)
                </span>{" "}
                {highlightSearchTerm(
                  "The Loco Pilot of a goods train shall, before detaching his engine from the train, irrespective of whether the train is vacuum brake or not, apply the brakes as under:-",
                  searchQuery
                )}
              </p>
              <div className="ml-6 space-y-1">
                <p>
                  {highlightSearchTerm(
                    "Inside station limits: If the gradient is steeper than 1 in 400, apply the hand-brake of his brake-van and also the hand-brakes of atleast six vehicles on the train; if the gradient in 1 in 400 or flatter apply the hand-brake of his brake-van.",
                    searchQuery
                  )}
                </p>
                <p>
                  {highlightSearchTerm(
                    "If, after the engine has been detached from the train, the brake-van is also required to be detached for attaching vehicles to or detaching vehicles from the train or for any other reason, the Guard shall before detaching the brake-van, apply (in lieu of the hand brake of the brake-van) the hand-bakes of atleast six more vehicles if the gradient is steeper than 1 in 400 or atleast six vehicles if the gradient is 1 in 400 or flatter.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Rule 4.49 */}
        <section id="4.49" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.49.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Starting and stopping of trains:-
            </h3>
          </div>

          <div className="ml-16">
            <p className="text-justify">
              {highlightSearchTerm(
                "The Loco Pilot shall start and stop his train carefully and without a jerk.",
                searchQuery
              )}
            </p>
          </div>
        </section>

        {/* Rule 4.50 */}
        <section id="4.50" className="scroll-mt-20 mt-12">
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.50.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Sounding of engine whistle:-
            </h3>
          </div>

          <div className="ml-16 space-y-4 text-justify">
            <p>
              {highlightSearchTerm(
                "(1) Except under special instructions, the Loco Pilot shall always sound the whistle of the engine according to the prescribed code of whistle-",
                searchQuery
              )}
            </p>
            <div className="ml-6 space-y-1">
              <p>
                {highlightSearchTerm(
                  "(a) before putting an engine in motion;",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(b) when entering a tunnel; and",
                  searchQuery
                )}
              </p>
              <p>
                {highlightSearchTerm(
                  "(c) at such other times and places as may be prescribed by special instructions.",
                  searchQuery
                )}
              </p>
            </div>
            <p>
              {highlightSearchTerm(
                "(2) Engine whistle code shall be prescribed under special instructions.",
                searchQuery
              )}
            </p>

            <div className="mt-6">
              <h4 className="font-semibold text-foreground mb-3">
                S.R.4.50 (i)
              </h4>
              <p className="mb-4">
                {highlightSearchTerm(
                  "The circumstances in which the Loco Pilot shall sound the engine whistle and the codes therefore are given below:-",
                  searchQuery
                )}
              </p>
              <div className="text-sm font-medium mb-2">
                {highlightSearchTerm("WHISTLE CODES", searchQuery)}
              </div>
              <div className="overflow-x-auto">
                <Table className="text-[13px] border border-border rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">Sl.No.</TableHead>
                      <TableHead className="min-w-[160px]">
                        Whistle code of engine
                      </TableHead>
                      <TableHead>Indication</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center align-top">1</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("•", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-2">
                          <div>
                            {highlightSearchTerm(
                              "(a) Before starting:-",
                              searchQuery
                            )}
                            <div className="ml-4 space-y-1">
                              <div>
                                {highlightSearchTerm(
                                  "(i) Indication to Loco Pilot of assisting/banking engine that Loco Pilot of leading engine is ready to start.",
                                  searchQuery
                                )}
                              </div>
                              <div>
                                {highlightSearchTerm(
                                  "(ii) Acknowledgement by the Loco Pilot of assisting/banking engine to leading engine.",
                                  searchQuery
                                )}
                              </div>
                              <div>
                                {highlightSearchTerm(
                                  "(iii) Engine ready to leave loco yard or after completing loco work.",
                                  searchQuery
                                )}
                              </div>
                              <div>
                                {highlightSearchTerm(
                                  "(iv) Engine ready to go to loco yard.",
                                  searchQuery
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            {highlightSearchTerm("(b) On run-", searchQuery)}
                            <div className="ml-4 space-y-1">
                              <div>
                                {highlightSearchTerm(
                                  "(i) Assistance of other engine not required.",
                                  searchQuery
                                )}
                              </div>
                              <div>
                                {highlightSearchTerm(
                                  "(ii) Acknowledgment of Loco Pilot of Assisting/banking engine that assistance stopped.",
                                  searchQuery
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">2</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("••", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Call for Guard's signal.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Signals not exchanged by Guard.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) Signals not exchanged by station staff.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">3</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("——— •", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Guard to release brakes.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Before starting engine or a train from station/mid-section.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) Main line clear after backing into siding.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">4</TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>{highlightSearchTerm("•••", searchQuery)}</div>
                          <div>{highlightSearchTerm("••••", searchQuery)}</div>
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Guard to apply brakes.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Train is out of control, Guard to assist.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">5</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("••••", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Train cannot proceed on account of accident, failure, obstruction or other exceptional cause.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Protect train in rear.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">6</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("—— —— ••", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Call for Guard to come to engine.",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">7</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("• —— •", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Token not received.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Token missed.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) With wrong 'authority to proceed'.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(d) Passing Stop Signal at 'On' on proper authority.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">8</TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("———", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Before starting—Vacuum recreated on Ghat section, remove Sprags.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Passing Automatic Stop signal at 'On'.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) Passing an Intermediate Block Stop signal at 'On' when the telephone provided on the signal post is out of order and the Loco Pilot is thus unable to contact the station in rear.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(d) On run – Acknowledgement of Guard's signal.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">9</TableCell>
                      <TableCell className="align-top">
                        <div>{highlightSearchTerm("———", searchQuery)}</div>
                        <div className="text-xs text-muted-foreground">
                          {highlightSearchTerm("(continuous)", searchQuery)}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Approaching tunnel or area of restricted visibility or curves or cutting or site of accident.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Recall railway servant protecting train in rear.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) Material train ready to leave.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(d) Running through a station.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(e) Approaching a Stop signal at 'On' or 'in consequence of fog, storm or any other reason the view of signals is obstructed'.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(f) Detained at a Stop signal.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        10
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("—— • —— •", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Train parting.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Train arriving incomplete.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              {/* Continuation rows 11–17 */}
              <div className="overflow-x-auto mt-6">
                <Table className="text-[13px] border border-border rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-center">Sl.No.</TableHead>
                      <TableHead className="min-w-[160px]">
                        Whistle code of engine
                      </TableHead>
                      <TableHead>Indication</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        11
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("•• ——", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Alarm chain pulled.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Insufficient vacuum / air pressure in engine.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) Guard applies vacuum/ air brake.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        12
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("—— ——", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Raise pantograph. To be acknowledged by the other engine.",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        13
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("—— • ——", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Lower pantograph. To be acknowledged by the other engine.",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        14
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("—— ••", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Signal arm lowered but light extinguished.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Signal arm improperly/insufficiently taken 'Off'.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) Defective signal.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        15
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm("—— —— ——", searchQuery)}
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Fouling mark not cleared.",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        16
                      </TableCell>
                      <TableCell className="align-top">
                        <div>{highlightSearchTerm("••••••", searchQuery)}</div>
                        <div>{highlightSearchTerm("••••••", searchQuery)}</div>
                        <div className="text-xs text-muted-foreground">
                          {highlightSearchTerm("(frequently)", searchQuery)}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <div>
                            {highlightSearchTerm(
                              "(a) Apprehension of danger.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(b) Danger signal to the Loco Pilot of an approaching train whose path is fouled or obstructed for any reason.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(c) While working on a single line section during total failure of communication or when single line working is introduced on a double line section.",
                              searchQuery
                            )}
                          </div>
                          <div>
                            {highlightSearchTerm(
                              "(d) Moving in wrong direction on a double line or against the signalled direction in the Automatic Block signalling territory on Double line or against the established direction in the Automatic Block signalling territory on Single Line.",
                              searchQuery
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center align-top">
                        17
                      </TableCell>
                      <TableCell className="align-top">
                        <div>
                          {highlightSearchTerm(
                            "—— ———— —— ——— ——",
                            searchQuery
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {highlightSearchTerm("(Intermittently)", searchQuery)}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        {highlightSearchTerm(
                          "Approaching a level crossing (Correction Memo No.04/2010 dated 10.06.2010)",
                          searchQuery
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                {highlightSearchTerm(
                  "Note.– The signals above are illustrated by '•' for a short whistle and '———' for a long whistle.",
                  searchQuery
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rule 4.51 - Bell signals between Loco Pilot and Guard */}
      <section id="4.51" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.51.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Bell signals between Loco Pilot and Guard:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "When bell communication is provided between the Loco Pilot and the Guard of the train, bell signal code, as may be prescribed by special instructions shall be used.",
              searchQuery
            )}
          </p>

          <p>
            {highlightSearchTerm(
              "SR 4.51 (i) The following bell signals are prescribed for use between the Motorman/Loco Pilot and Guard in case of EMUs/MEMUs/DEMUs:-",
              searchQuery
            )}
          </p>

          <div className="overflow-x-auto">
            <Table className="text-[13px] border border-border rounded-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">SL.No.</TableHead>
                  <TableHead className="min-w-[160px]">
                    Code of bell Signals
                  </TableHead>
                  <TableHead>Indication</TableHead>
                  <TableHead className="min-w-[160px]">
                    Acknowledgement
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center align-top">1</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("O", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("Stop train", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("O", searchQuery)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center align-top">2</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OO", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("Start train", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OO", searchQuery)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center align-top">3</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OOO", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm(
                      "Guard required by the Loco Pilot/Motorman",
                      searchQuery
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OOO", searchQuery)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center align-top">4</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OOOO", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm(
                      "Protect the train in rear",
                      searchQuery
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OOOO", searchQuery)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center align-top">5</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("O Pause O", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm(
                      "Zone of speed restriction over. Resume prescribed speed.",
                      searchQuery
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("O Pause O", searchQuery)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center align-top">6</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OO Pause OO", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm(
                      "Passing Automatic Stop Signal at 'On'",
                      searchQuery
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OO Pause OO", searchQuery)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center align-top">7</TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OOO Pause OOO", searchQuery)}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm(
                      "Motorman not to exceed prescribed speed.",
                      searchQuery
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {highlightSearchTerm("OOO Pause OOO", searchQuery)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="text-xs text-muted-foreground mt-3">
            {highlightSearchTerm(
              'Note: The signals above are illustrated by "O" for a ring.',
              searchQuery
            )}
          </div>

          <p className="mt-6">
            {highlightSearchTerm(
              "SR.4.51(ii) In the event of failure of bell code communication between the Motorman/Loco Pilot and Guard of an EMU/MEMU/DEMU train the Motorman/Loco Pilot and Guard shall reproduce the relevant bell code by sounding the horn. In addition, the Guard/Motorman/Loco Pilot shall make use of the corresponding hand signal wherever prescribed, by means of the hand signal lamp/flag.",
              searchQuery
            )}
          </p>

          <div className="text-xs text-muted-foreground mt-2">
            {highlightSearchTerm(
              "(Correction Memo No. 5/2008 dt.23.12.2008)",
              searchQuery
            )}
          </div>
        </div>
      </section>

      {/* Rule 4.52 - Throwing out water, fire or cinders */}
      <section id="4.52" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.52.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Throwing out water, fire or cinders:-
          </h3>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "A Loco Pilot or Assistant Loco Pilot shall not throw out water, fire or cinders, when passing through a station yard or tunnel, or when on a bridge.",
              searchQuery
            )}
          </p>
        </div>
      </section>

      <section id="4.53" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.53.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Hose of water crane:-
          </h3>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "After taking water from a tank or water column, the Loco Pilot shall see that the hose or arm is left clear of the line and, when it is provided with fastenings, properly secured..",
              searchQuery
            )}
          </p>
        </div>
      </section>

      {/* Rule 4.54 - Passengers */}
      <section id="4.54" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.54.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Passengers:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "Every Guard shall give his best assistance to passengers entraining and detraining.",
              searchQuery
            )}
          </p>

          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.54 (i)
            </h4>
            <p className="ml-6 flex items-center justify-center">
              {highlightSearchTerm(
                "Both the Guard and Brakesman of a train carrying passengers shall give attention to the needs of passengers, especially during night. At every station at which the train stops long enough, they shall pass along the train from each end, to ascertain whether any passengers require assistance.",
                searchQuery
              )}
            </p>{" "}
          </div>
        </div>
      </section>

      {/* Sub-section Header: G. Duties of staff on Arrival */}
      <div className="pt-8 mt-8 border-t border-document-border flex justify-center">
        <h3 className="text-xl font-semibold text-foreground">
          G. Duties of staff on Arrival
        </h3>
      </div>
      {/* Rule 4.55 - Shutting off power */}
      <section id="4.55" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.55.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Shutting off power:-
          </h3>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "In stopping a train, the Loco Pilot shall determine where to shut off power by paying particular attention to the gradient, the state of the weather, the condition of the rails, the brake power and the length and weight of the train.",
              searchQuery
            )}
          </p>
        </div>
      </section>

      {/* Rule 4.56 - Guard to see that train is stopped clear of fouling marks */}
      <section id="4.56" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.56.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Guard to see that train is stopped clear of fouling marks:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "When a train comes to stand at a station, the Guard shall see that, wherever possible, the last vehicle of his train has cleared the fouling marks of all points and crossings. If not, he shall inform the Station Master at once and exhibit Stop hand signal to prevent any movement on the fouled line.",
              searchQuery
            )}
          </p>

          <div className="space-y-4">
            <p>
              {highlightSearchTerm(
                "(b) The Guard shall see that the train has arrived complete. If the train is incomplete, the Guard shall inform the Station Master at once.",
                searchQuery
              )}
            </p>

            <p>
              {highlightSearchTerm(
                "(c) At night, when a train is waiting at a station to give precedence to another train in the same direction, the Guard of the train shall, before the following train is admitted into the station, change the side lamp, adjacent to the line on which the following train is to be admitted to show white towards the rear of the train and red towards the engine of his train, the other side lamp being left in its normal position i.e., showing red towards the rear and white towards the engine of his train. After the following train has been admitted into the station, the Guard shall, immediately put back the side lamp to its normal position.",
                searchQuery
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Rule 4.57 - Detaching engine */}
      <section id="4.57" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.57.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Detaching engine:-
          </h3>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "Whenever a train has been brought to a stand, and it is necessary for the engine, with or without vehicles, to be detached from the rest of the train, the Guard shall, before the train is uncoupled, satisfy himself that the van-brakes have been put on securely, and take such other measures as may be prescribed by special instructions.",
              searchQuery
            )}
          </p>
        </div>
      </section>

      {/* Rule 4.58 - Loco Pilot to see that train is stopped clear of fouling marks */}
      <section id="4.58" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.58.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Loco Pilot to see that train is stopped clear of fouling marks:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "When a train comes to a stand at a station, the Loco Pilot shall see that, wherever possible, his engine is clear of the fouling marks of all points and crossings. If not, he shall take steps to inform the Station Master at once and exhibit Stop hand signal to prevent any movement on the fouled line.",
              searchQuery
            )}
          </p>

          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.58 (i)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "If the Loco Pilot finds that his engine has not cleared the fouling marks of all points and crossings, he shall call the attention of the Station Master by giving three long whistles and at the same time, wave a Stop hand signal. He shall also send his Assistant Loco Pilot / Fireman to advise the Station Master on duty of the position.",
                searchQuery
              )}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.58 (ii)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "When a goods train is stopped at a station the Loco Pilot of the leading engine shall, unless otherwise signaled by the Station Master or the Guard of the train, bring his engine to a stop as close as possible, to the Starter, fouling mark, train to stand clear of the fouling mark at the rear end.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "The observance of S.R.4.58 (ii)(a) by the Loco Pilot does not in any way absolve the Guard of his responsibility in regard to the observance of G.R 4.56 and Subsidiary Rules there under to ensure that the last vehicle of the train has cleared the fouling marks of all points and crossings.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rule 4.59 - Moving of train carrying passengers after it has been stopped at a station */}
      <section id="4.59" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.59.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Moving of train carrying passengers after it has been stopped at a
            station:-
          </h3>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "When a train carrying passengers has been brought to a stand at a station, whether alongside, beyond, or short of the platform, the Loco Pilot shall not move it, except under orders of the Guard or to avert an accident.",
              searchQuery
            )}
          </p>
        </div>
      </section>

      {/* Rule 4.60 - Guard not to leave train till handed over */}
      <section id="4.60" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.60.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Guard not to leave train till handed over:-
          </h3>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "No Guard shall leave his train until it has been properly handed over in accordance with special instructions.",
              searchQuery
            )}
          </p>
        </div>
      </section>

      {/* Rule 4.61 - Loco Pilot not to leave engine when on duty */}
      <section id="4.61" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.61.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Loco Pilot not to leave engine when on duty:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "No Loco Pilot shall leave his working locomotive or his self-propelled vehicle when on duty, whether at a station or on a running line, except in case of absolute necessity and after a competent railway servant has been placed in charge of the locomotive or self-propelled vehicle. In the case of a self-propelled vehicle manned by a Loco Pilot only, the Loco Pilot may leave it when necessary, provided he has locked the cabs and has put the vehicle in low gear with the ignition switched off and the hand brake.",
              searchQuery
            )}
          </p>

          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.61 (i)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "Rule 4.61 applies to Firemen and Assistant Loco Pilots also. The competent railway servant referred to therein, in the case of running train, is the First Fireman / Assistant Loco Pilot and in the case of shunting engines, the Fireman / Assistant Loco Pilot.",
                searchQuery
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Rule 4.62 - Working of Material Trains */}
      <section id="4.62" className="scroll-mt-20 mt-12">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            H. Working of Material Trains
          </h2>
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.62.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Working of a material train in a block section:-
            </h3>
          </div>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p className="font-medium">
            {highlightSearchTerm(
              "A material train shall be worked only with the permission of the Station Masters on each side and in accordance with special instructions.",
              searchQuery
            )}
          </p>

          {/* SR 4.62 (i) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (i)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "When a material train is to be run for engineering purposes, the Divisional Railway Manager shall make necessary arrangements in good time advising all concerned as to the nature of the work to be done, how long it will last and where the material train is to be stabled daily during the period of work. Except with the permission of the Divisional Railway Manager, a material train shall not be permitted to work during periods of poor visibility due to fog, storm or any other cause. If it becomes necessary to alter the stabling station, the Guard shall advise the stations concerned.",
                  searchQuery
                )}
              </p>
              <div className="bg-muted/50 p-3 rounded border-l-4 border-amber-500">
                <p className="text-sm text-muted-foreground italic">
                  {highlightSearchTerm(
                    "Note: A material train shall not be stabled at a station with only one loop line and no siding, except under the special orders of the Divisional Railway Manager.",
                    searchQuery
                  )}
                </p>
              </div>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "In case of emergency the running of a material train may, on the requisition of the engineering branch, be at once ordered by the Station Master or other Senior Official.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.62 (ii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (ii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "Subject to the provisions of SR 4.62 (vi), the speed of Material Trains shall not exceed 75 kmph when worked with engine leading.",
                  searchQuery
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                (Correction Memo No.01/2013 dated 27.05.2013)
              </p>
            </div>
          </div>

          {/* SR 4.62 (iii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (iii)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "The Guard and Loco Pilot of a material train are responsible for protecting the train in accordance with rules when working between stations. They are authorised to direct Gangmate and Gangman to assist them in this regard.",
                searchQuery
              )}
            </p>
          </div>

          {/* SR 4.62 (iv) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (iv)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "Before entering a section on which a material train is required to stand on a grade of 1 in 50 or steeper, the engine should be so attached that when the train is standing, the engine is at the downhill end of the gradient.",
                searchQuery
              )}
            </p>
          </div>

          {/* SR 4.62 (v) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (v)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "On down gradients steeper than 1 in 100 'pushing' is not permitted. On gradients flatter than 1 in 100, ascending or descending, 'pushing' may be permitted.",
                searchQuery
              )}
            </p>
          </div>

          {/* SR 4.62 (vi) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (vi)
            </h4>
            <div className="ml-6 space-y-4">
              <p className="font-semibold">
                {highlightSearchTerm(
                  "When the engine is pushing a material train and the brake-van is leading:-",
                  searchQuery
                )}
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  {highlightSearchTerm(
                    "The speed shall not exceed 15 kilometres an hour on the straight track, and 10 kilometres an hour over the turn-out;",
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    'The Guard shall travel in the leading brake-van and continuously exhibit a "Proceed" hand signal to the Loco Pilot; the absence of a "Proceed" hand signal may be due to an obstruction and the Loco Pilot shall stop at once;',
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    "The train crew shall keep a good look-out especially in the direction in which the train is moving and shall be prepared to stop short of any obstruction; and",
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    "At non-interlocked stations when approaching turn-outs, the Guard shall stop the train at the outermost points, satisfy himself that the points are correctly set, locked and manned and then show hand signals to the Loco Pilot to back.",
                    searchQuery
                  )}
                </li>
              </ul>

              <div className="mt-6">
                <p className="font-semibold mb-3">
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "When the engine is pushing a material train and the brake-van is not leading-",
                    searchQuery
                  )}
                </p>
                <ul className="list-decimal list-inside ml-8 space-y-2">
                  <li>
                    {highlightSearchTerm(
                      "The Speed shall not exceed 10 kilometres an hour;",
                      searchQuery
                    )}
                  </li>
                  <li>
                    {highlightSearchTerm(
                      "the Guard shall travel in the leading vehicle and the provisions of clause (a)(2) of S.R.4.62 (vi) shall be complied with;",
                      searchQuery
                    )}
                  </li>
                  <li>
                    {highlightSearchTerm(
                      "clauses (a)(3) and (4) of S.R.4.62 (vi) shall also be complied with",
                      searchQuery
                    )}
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-semibold mb-3">
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "When a material train is approaching a station with the engine pushing the train, on the single line, in regular working the Station Master and in unexpected circumstances, i.e., after meeting with an obstruction, etc., provisions of S.R.4.12 shall be complied with; on the double line, the provisions of S.R.4.12 shall be complied with.",
                    searchQuery
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* SR 4.62 (vii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (vii)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                {highlightSearchTerm(
                  "Except in an emergency, such as an accident or breach of the railway line, working of material trains carrying labourers shall not be permitted between sunset and sunrise. If due to certain circumstances, it is necessary to work material trains during night, permission to do so shall be obtained from the Divisional Railway Manager, who shall give the permission subject to the following conditions: -",
                  searchQuery
                )}
              </p>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>
                  {highlightSearchTerm(
                    "The work spot shall be well lit.",
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    "Second class accommodation for the labourers shall be provided on the train.",
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    "The Guard of the train shall ensure that no labourer is travelling in the material wagons.",
                    searchQuery
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* SR 4.62 (viii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (viii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "A material train shall not be divided outside station limits, except in an emergency, and in such cases only on the authority and personal supervision of an engineering official of not lower in rank than a JE/SSE/P.Way who shall be entirely responsible for seeing, before the train is divided, that necessary precautions are taken to ensure safety. Before the train is divided, the Guard shall apply the handbrake in the brake-van and the hand-brakes of a sufficient number of wagons and lock, by means of safety chains or sprags sufficient number of wheels in each portion of the train and shall also ensure personally that all the Labourers have been detrained. Vehicles shall not be detached from a material train standing on a grade of 1 in 100 or steeper. The Loco Pilot may detach the engine from a material train with brakes on each wagon are properly applied and the wheels secured with safety chains and sprags to prevent any movement.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.62 (ix) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (ix)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "No material shall be left above rail level within the distances prescribed in the Schedule of Dimensions. If a material train has to leave the spot where material is being deposited before the removal of such material can be effected, men shall be left to complete the work.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.62 (x) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (x)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "A material train may be moved from the traffic yard to the loco yard only with the permission of the Locomotive Official in-charge of the loco yard and subsequent movement of the train inside the loco yard shall also be directed by the Locomotive Official in-charge.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.62 (xi) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (xi)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "At least one brake-van shall be attached in the rear of a material train. When running through and between stations, the engine shall be marshalled at one end of the train and the brake-van at the other end. Material trains shall be marshalled with regard to the brake-vans so that whenever a train parting occurs on the run, there shall be adequate brake-power to control the rear portion. If the Brake Power Rules require the provision of only one brake-van then this van shall be attached in the rear of the train; but if two or more brake-vans are required, the additional vans may be interspersed throughout the train provided that the vans are not separated by a load in excess of the brake power necessary.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.62 (xii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (xii)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                {highlightSearchTerm(
                  'The Station Master shall issue a memo (in duplicate) in the following form, along with the "authority to proceed" to the Loco Pilot of every material train which is required to work outside station limits:-',
                  searchQuery
                )}
              </p>

              {/* Memo box */}
              <div className="border-2 border-gray-400 rounded-md p-4 bg-gray-50 text-sm">
                <p className="mb-2">
                  {highlightSearchTerm(
                    "To the Loco Pilot of Material Train No ……………",
                    searchQuery
                  )}
                </p>
                <p className="mb-2">
                  {highlightSearchTerm(
                    "You are required to proceed to …………… station at the other end or you must return to …………… station (as the case may be).",
                    searchQuery
                  )}
                </p>
                <p className="mb-4">
                  {highlightSearchTerm(
                    "You should clear the block section by ………… Hrs ……….. Mts. for the passage of other trains.",
                    searchQuery
                  )}
                </p>

                <div className="flex justify-between mt-6">
                  <div>
                    <p>Station ……………</p>
                    <p className="mt-4">Date ……………</p>
                  </div>
                  <div className="flex gap-12">
                    <p>Guard</p>
                    <p>Station Master</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {highlightSearchTerm(
                  'The memo shall be countersigned by the Guard. The Loco Pilot shall take the original and return the duplicate signed. The Station Master shall enter the particulars contained in the memo, in the "Remarks" column of the Trains Signal Register against the entry for the train.',
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.62 (xiii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (xiii)
            </h4>
            <div className="ml-6 space-y-4">
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <span className="font-semibold text-foreground">a)</span>{" "}
                  {highlightSearchTerm(
                    "All the wagons forming part of Material Trains shall have a nominated base depot which should be clearly stenciled on these wagons.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">b)</span>{" "}
                  {highlightSearchTerm(
                    "These wagons must touch the base depot at least once in thirty days at which time, they shall be intensively examined and repairs, if any, shall be attended and a BPC issued giving therein the individual number of wagons for which the BPC is issued. The BPC will be valid for a period of 30 (thirty) days from the date of issue. The engineering official in-charge of the Material Train shall be responsible to ensure that the Material Train is moved to the base depot for examination before the expiry of the validity period for the issue of fresh BPC. If the BPC has become invalid due to the lapse of 30 days, the rake shall be brought to the base depot with GDR check.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">c)</span>{" "}
                  {highlightSearchTerm(
                    "The brake power percentage at the originating point shall not be less than 90% and shall not be less than 70% enroute. When the brake power falls below 70%, the rake shall be moved to the base depot for upgradation and issue of fresh BPC.",
                    searchQuery
                  )}
                </li>
              </ul>

              <p className="text-xs text-muted-foreground mt-4 italic">
                (Correction Memo No.01/2013 dated 27.05.13).
              </p>
            </div>
          </div>

          {/* SR 4.62 (xiv) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R. 4.62 (xiv)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "All manned level crossing gates shall be closed against road traffic for the in a block section shall ensure that all manned level crossing gates are closed against road traffic before passing the same. He shall whistle intermittently while approaching the level crossings and obey the aspect of the Gate Stop signal if any. In the case of non-interlocked gates, and in the case of interlocked gates in double line sections while proceeding on the wrong direction, the Loco Pilot shall bring his material train to a stop 30 metres short of the level crossing and then restart and pass the gate after confirming that the gate is closed against road traffic.",
                  searchQuery
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                (Correction memo No. 6 dated 06.11.06).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rule 4.63 - Workers on material train */}
      <section id="4.63" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.63.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Workers on material train:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "The Guard of a material train shall, before giving the signal to start, see that all the workers are on the train, and warn them to sit down.",
              searchQuery
            )}
          </p>

          {/* SR 4.63 (i) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.63 (i)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "The employment of women on material trains for unloading material is prohibited; but they maybe taken in empty ballast wagons to different depots for employment in loading.",
                searchQuery
              )}
            </p>
          </div>

          {/* SR 4.63 (ii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.63 (ii)
            </h4>
            <p className="ml-6">
              {highlightSearchTerm(
                "If a material train has been divided, all the workers shall be removed from the wagons before the train is coupled up again.",
                searchQuery
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Rule 4.64 - Protection of material train when stabled */}
      <section id="4.64" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.64.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Protection of material train when stabled:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-foreground">(1)</span>{" "}
              {highlightSearchTerm(
                "a material train shall not be stabled on a running line at a station, except in unavoidable circumstances.",
                searchQuery
              )}
            </p>

            <p>
              <span className="font-semibold text-foreground">(2)</span>{" "}
              {highlightSearchTerm(
                "When a material train is stabled at a station, it shall be protected in the following manner and the Station Master shall ensure that-",
                searchQuery
              )}
            </p>

            <ul className="list-disc list-inside ml-8 space-y-2">
              <li>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "the vehicles of the material train have been properly secured and are not fouling any points or crossings,",
                  searchQuery
                )}
              </li>
              <li>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "all necessary points have been set against the line on which the material train is stabled and such points have been secured with clamps or bolts and cotters and padlocks, and",
                  searchQuery
                )}
              </li>
              <li>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "the keys of such padlocks are kept in his personal custody until the material train is ready to leave the siding or line.",
                  searchQuery
                )}
              </li>
            </ul>

            <p>
              <span className="font-semibold text-foreground">(3)</span>{" "}
              {highlightSearchTerm(
                "The guard shall not relinquish charge until he has satisfied himself that the material train has been protected as prescribed in this rule.",
                searchQuery
              )}
            </p>
          </div>

          {/* SR 4.64 (i) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.64 (i)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                {highlightSearchTerm(
                  "The Station Master and the Guard of a material train are jointly responsible for ensuring-",
                  searchQuery
                )}
              </p>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>
                  {highlightSearchTerm(
                    "that the train is berthed clear of fouling marks, at each end of the line on which it is stabled;",
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    "that the points leading to the line on which the material train is stabled are set against that line and locked in that position with locking bolts, cotters and padlocks or clamps and padlocks; and",
                    searchQuery
                  )}
                </li>
                <li>
                  {highlightSearchTerm(
                    "that the hand-brakes are applied on a sufficient number of wagons, the van-brakes are screwed down and that a sufficient number of wheels are locked by safety chains and padlocks.",
                    searchQuery
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* SR 4.64 (ii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.64 (ii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "When a material train is stabled on a siding, outside station limits, the Guard shall ensure that it is berthed clear of fouling marks and traps and without obstructing the running line. He shall apply the hand-brakes on a sufficient number of vehicles, screw down the van-brakes and locks the wheels of the wagons by means of safety chains and padlocks.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rule 4.65 - Working of Track maintenance machines */}
      <section id="4.65" className="scroll-mt-20 mt-12">
        <div className="flex items-start space-x-6 mb-6">
          <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
            4.65.
          </span>
          <h3 className="font-semibold text-lg text-foreground">
            Working of Track maintenance machines:-
          </h3>
        </div>

        <div className="ml-16 space-y-6 text-justify">
          <p>
            {highlightSearchTerm(
              "Track laying or on track Tamping or maintenance machines shall be worked only with the permission of the Station Master and in accordance with special instructions.",
              searchQuery
            )}
          </p>

          {/* SR 4.65 (i) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (i)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                <span className="font-semibold text-foreground">(1)</span>{" "}
                {highlightSearchTerm(
                  "A Track maintenance machine is a self-propelled vehicle which can move both in forward and reverse direction.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(2)</span>{" "}
                {highlightSearchTerm(
                  "The track machine may work both by day or night and move within the maximum speed sanctioned for that with speed restrictions in force in the section being observed.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (ii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (ii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "Each machine will be under the control of an operator responsible for the safe working of the machine and for observation of all rules.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (iii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (iii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The Operator shall undergo a course of training at the Multi-Disciplinary Zonal Training Institute and on passing the written examination held at the end of the course, advice to that effect shall be communicated by the Principal to the concerned Departmental Officer. The Departmental Officer shall then issue the necessary Competency Certificate to the Operator.",
                  searchQuery
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                (Correction Memo No. 1/2019 dated 23.01.19)
              </p>
            </div>
          </div>

          {/* SR 4.65 (iv) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (iv)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The certificate of competency shall be valid for 3 years and kept in the personal custody of the operator and shall be promptly produced when required.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (v) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (v)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The operator shall apply to his Divisional Engineer well in advance before the date of expiry of competency certificate. The D.E.N. shall renew the certificate after holding an oral test and satisfying that the operator is conversant with the rules relating to the work of Track Maintenance machine and the rules for working trains.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (vi) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (vi)
            </h4>
            <div className="ml-6 space-y-4">
              <p>
                {highlightSearchTerm(
                  "The following rule books and equipment in good working condition shall be in possession of the operator of each unit while the machines are working",
                  searchQuery
                )}
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "One copy of the General and Subsidiary Rules Book updated with all corrections.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "One copy of the Accident Manual.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "One copy of the Working Time Table.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(d)</span>{" "}
                  {highlightSearchTerm(
                    "One copy of the Block Working Manual.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(e)</span>{" "}
                  {highlightSearchTerm(
                    "A red flashing hand signal lamp.",
                    searchQuery
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    (Correction Memo 03/2021 dated 25.08.2021)
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-foreground">(f)</span>{" "}
                  {highlightSearchTerm(
                    "One portable field telephone with accessories.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(g)</span>{" "}
                  {highlightSearchTerm(
                    "Two green hand signal flags.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(h)</span>{" "}
                  {highlightSearchTerm(
                    "Three red hand signal flags.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(i)</span>{" "}
                  {highlightSearchTerm(
                    "Two tri-colour hand signal lamps for working at night.",
                    searchQuery
                  )}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(j)</span>{" "}
                  {highlightSearchTerm("10 detonators in a tin,", searchQuery)}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(k)</span>{" "}
                  {highlightSearchTerm("Two banner flags.", searchQuery)}
                </li>
                <li>
                  <span className="font-semibold text-foreground">(l)</span>{" "}
                  {highlightSearchTerm("One first aid box.", searchQuery)}
                </li>
              </ul>
            </div>
          </div>

          {/* SR 4.65 (vii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (vii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The Track maintenance machine shall be considered as a train.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (viii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (viii)
            </h4>
            <div className="ml-6 space-y-6">
              <p className="font-semibold">
                {highlightSearchTerm(
                  "Procedure for working of the Track Machines.",
                  searchQuery
                )}
              </p>

              {/* (a) Through movement */}
              <div>
                <p className="font-semibold mb-3">
                  <span className="font-semibold text-foreground">(a)</span>{" "}
                  {highlightSearchTerm(
                    "Through movement of Track machines from one station to another. Only one self-propelled or two coupled self-propelled track machines or one self-propelled track machine hauled by locomotive is permitted to run at a time in a block section under one authority observing all rules required for movement of trains.",
                    searchQuery
                  )}
                </p>
              </div>

              {/* (b) Working in block section */}
              <div>
                <p className="font-semibold mb-3">
                  <span className="font-semibold text-foreground">(b)</span>{" "}
                  {highlightSearchTerm(
                    "Working of single or coupled track machine(s) in a block section.",
                    searchQuery
                  )}
                </p>
                <div className="ml-6 space-y-4">
                  <p>
                    <span className="font-semibold text-foreground">1)</span>{" "}
                    {highlightSearchTerm(
                      "The Operator / JE/SSE (P-Way) of the section shall inform the Station Master in writing the specific location where the machine will work and whether the machine will proceed to the next station or return to the starting station and mention the time at which the Track Machine will clear the section along with identifying number of the machine and the name of the Operator / JE/SSE/P-Way of the section.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">2)</span>{" "}
                    {highlightSearchTerm(
                      "The Station Master shall then contact the control and on obtaining permission from the control shall allow the Track Machine into the block section on line clear - material train during line block. In addition to the regular authority, Form T/465-E shall be issued filling up the relevant portions.",
                      searchQuery
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    (Correction Memo 05/2023 dated 07.09.2023)
                  </p>
                </div>
              </div>

              {/* (c) Working in group */}
              <div>
                <p className="font-semibold mb-3">
                  <span className="font-semibold text-foreground">(c)</span>{" "}
                  {highlightSearchTerm(
                    "Working of Track machines in a group in the same block section.",
                    searchQuery
                  )}
                </p>
                <div className="ml-6 space-y-3">
                  <p>
                    <span className="font-semibold text-foreground">1)</span>{" "}
                    {highlightSearchTerm(
                      "Any number of self-propelled track machines may be allowed to enter a block section during line block in a group / convoy for track maintenance and other works connected with the track.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">2)</span>{" "}
                    {highlightSearchTerm(
                      "However, not more than one track machine hauled by locomotive is permitted to work in a group with other self-propelled track machines.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">3)</span>{" "}
                    {highlightSearchTerm(
                      "When more than one machine is required to work within the same block section, these machines may be allowed to work in a convoy under one authority to proceed, namely form T/465-E.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">4)</span>{" "}
                    {highlightSearchTerm(
                      "All the track machines shall enter the section at the same time one after another keeping adequate distance of 200 meters between each other and with the proper authority as given under these rules.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">6)</span>{" "}
                    {highlightSearchTerm(
                      "In case of track machines working in a group / convoy, the SSE/JE (P-Way) in-charge shall give the requisition for block in duplicate to the Station Master on duty, indicating therein specific location where the machine will work, the line i.e. Up/Down, the number of track machines that will work along with individual number and sequence.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">10)</span>{" "}
                    {highlightSearchTerm(
                      "On completion of the work, the machines shall be received by taking Off of the reception signals in case of single line and in case of double line while moving on the right direction. All the machines shall be received on the same road and the SM shall ensure that the route is not altered till the complete arrival of the last track machine.",
                      searchQuery
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">11)</span>{" "}
                    {highlightSearchTerm(
                      "In case of wrong line working, on completion of the work, the Track Machine Operator of the machine/ leading machine shall bring his machine to a stop outside the FSS of the right line or the LSS of the wrong line (on which he is running), whichever he comes across first. The Station Master of the station in rear shall arrange to send a competent railway servant to this location with a written memo. The competent railway servant shall hand over the written memo to the SSE/JE (P. Way) and pilot the machine(s) up to the Shunt signal (on which he is running), where provided. The Shunt signal shall be taken off to receive the machine(s) to any of the running lines, as operationally feasible.",
                      searchQuery
                    )}
                  </p>
                  <div className="ml-8 mt-3 space-y-2">
                    <p>
                      {highlightSearchTerm(
                        "In the event of the Shunt signals not being provided, the Track machine(s) shall be piloted by a competent railway servant from outside the FSS of the right line or LSS of the wrong line, whichever he comes across first into the station, on the written authority as per the provisions of S.R.5.10 (i) duly ensuring the correct setting, clamping and padlocking of Points, as may be required.",
                        searchQuery
                      )}
                    </p>
                    <p>
                      {highlightSearchTerm(
                        "The Points shall not be altered till such time the SSE/JE (P. Way) in charge certifies the complete arrival of all the track machine/ track machines in writing. The SSE/JE (P.Way) shall be responsible to ensure that all the track machines follow each other without delay and arrive at the station safely.",
                        searchQuery
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      (Correction Memo 02/2023 dated 26.02.2023)
                    </p>
                  </div>
                  <p>
                    <span className="font-semibold text-foreground">12)</span>{" "}
                    {highlightSearchTerm(
                      "Station Master receiving the machines shall clear the section for normal train operation duly exchanging message supported by a Private Number with the Station Master at the other end quoting the machine type and number for having cleared the block section at his station, only after SSE/JE (P-Way) in-charge has returned the track machine block permit (Form T/465-E), and has certified in writing the complete arrival of all the track machines and that the track is clear of any obstruction and the section is fit for train movement.",
                      searchQuery
                    )}
                  </p>
                  <div className="ml-8 mt-4">
                    <p className="mb-3">
                      {highlightSearchTerm(
                        "The certificate to be given by the SSE/JE (P-Way) in-charge shall be in the following format. The Form T/465-E shall be cancelled and handed over to the SSE/JE (P-Way) in-charge.",
                        searchQuery
                      )}
                    </p>
                    {/* Certificate format */}
                    <div className="border-2 border-gray-400 rounded-md p-4 bg-gray-50 text-sm">
                      <p className="mb-4">
                        {highlightSearchTerm(
                          "To The Station Master of _________ station",
                          searchQuery
                        )}
                      </p>
                      <p className="mb-4">
                        {highlightSearchTerm(
                          "Date: ________ Time: ________",
                          searchQuery
                        )}
                      </p>
                      <p className="mb-4">
                        {highlightSearchTerm(
                          "This is to certify that all the track machines bearing the numbers (Machine type and No.) ________ which have worked in the ________ block section, have arrived complete at ________ station at ________ hrs and the track is clear of any obstruction and the section is fit for train movement.",
                          searchQuery
                        )}
                      </p>
                      <div className="flex justify-between mt-6">
                        <p>Signature of SSE/JE (P-Way) in-charge</p>
                        <p>Acknowledgement of SM: ________ Time: ________</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      (Correction Memo No.02/2017 dated 12.05.2017)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SR 4.65 (ix) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (ix)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "All manned level crossing gates shall be closed against road traffic for the passage of Track machine. The Operator-in-charge of the track machine in a block section shall ensure that all manned level crossing gates are closed against road traffic before passing the same. He shall whistle intermittently while approaching the level crossings and obey the aspect of the Gate Stop signal if any. In the case of non-interlocked gates, and in the case of interlocked gates in double line sections while proceeding on the wrong direction, the Operator shall bring his track machine to a stop 30 metres short of the level crossing and then restart and pass the gate after confirming that the gate is closed against road traffic",
                  searchQuery
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                (Correction memo No. 6 dated 06.11.06).
              </p>
            </div>
          </div>

          {/* SR 4.65 (x) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (x)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The track Machine shall not be permitted to work during periods of poor visibility due to fog, storm or any other cause except under the permission of Divisional Railway Manager.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xi) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xi)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The Track Machine shall not be permitted to work during total interruption of communications.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The Operator-in-charge of the machine is responsible for protecting the machine in accordance with the rules for protection of trains between stations. He is authorised to direct the Gangmates and Gangmen to assist him in this.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xiii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xiii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "No material shall be left above rail level within the distance prescribed in the Schedule of Dimensions. Before leaving the spot the Operator shall ensure the removal of such materials.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xiv) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xiv)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The Operator of the machine shall be responsible to ensure that the adjoining line is not fouled at any time during the course of operations. In case of fouling, he shall immediately arrange to protect the adjoining track in accordance with Rule 6.03.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xv) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xv)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "No traffic train shall be allowed to enter the block section until the track machine clears the section at any one of the block stations. The Station Master shall advise the Operator the time and station at which he shall clear the section. The Operator shall take the original and return the duplicate duly signed to the Station Master. The Station Master shall enter the particulars contained in the memo in the machine.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xvi) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xvi)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "The Operator is responsible to ensure that the machine has arrived complete and then only he shall issue a written memo to the Station Master.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xvii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xvii)
            </h4>
            <div className="ml-6 space-y-4">
              <p className="font-semibold">
                {highlightSearchTerm(
                  "Protection of track machines when stabled at a station.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(a)</span>{" "}
                {highlightSearchTerm(
                  "The track machine shall not be stabled on a running line at a station except under unavoidable circumstances.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(b)</span>{" "}
                {highlightSearchTerm(
                  "No shunting of goods or passenger stock shall be permitted on the line where the track machines are stabled nor shunting performed with the machines attached.",
                  searchQuery
                )}
              </p>
              <p>
                <span className="font-semibold text-foreground">(c)</span>{" "}
                {highlightSearchTerm(
                  "When the machine is stabled, the Operator shall ensure that it is berthed clear of fouling marks and traps and without obstructing the adjacent lines. He shall apply the hand brakes and skids to prevent movement.",
                  searchQuery
                )}
              </p>
              <p className="ml-6">
                {highlightSearchTerm(
                  "The concerned points shall be set against the line on which the track machines are stabled and such points shall be secured with clamps or bolts and cotters and padlocked. The keys of such padlocks shall be kept in the personal custody of the Operator until the machine is ready to leave from the siding or running line. The Operator shall not relinquish charge until he has satisfied himself that the machine has been protected as prescribed.",
                  searchQuery
                )}
              </p>
            </div>
          </div>

          {/* SR 4.65 (xviii) */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4 text-base">
              S.R.4.65 (xviii)
            </h4>
            <div className="ml-6">
              <p>
                {highlightSearchTerm(
                  "In case of failure of the machine in the block section and the Operator is not able to clear the section, a message should be sent to the nearest Station Master as well as the Control through portable telephone or otherwise for arranging a light engine to tow the unit. In case of such break down of the machines, it shall be treated as an obstruction and protection of the machine and track shall be arranged by the Operator in terms G.R.6.03 and S.R. thereunder Accident to track machine shall be treated in the same manner as of trains.",
                  searchQuery
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rule 4.66 - Private Engines and Vehicles */}
      <section id="4.66" className="scroll-mt-20 mt-12">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            I. Private Engines and Vehicles
          </h2>
          <div className="flex items-start space-x-6 mb-6">
            <span className="text-rule font-bold text-lg min-w-fit bg-muted px-3 py-1 rounded">
              4.66.
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Private engines and vehicles:-
            </h3>
          </div>
        </div>

        <div className="ml-16 text-justify">
          <p>
            {highlightSearchTerm(
              "No engine or other vehicle, which are the property of a private owner, shall be allowed to enter upon the railway, except in accordance with special instructions.",
              searchQuery
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
