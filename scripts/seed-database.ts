import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chapters = [
  { 
    id: 1, 
    title: "General Rules",
    rules: [
      { id: "1.01", title: "Standard time" },
      { id: "1.02", title: "Adherence to advertised time" },
      { id: "1.03", title: "Setting watch" },
      { id: "1.04", title: "Time of attendance for train crew" },
      { id: "1.05", title: "Proper running line" },
      { id: "1.06", title: "Direction of running" },
      { id: "1.07", title: "Supply of Working Time Table" },
      { id: "1.08", title: "Limits of speed generally" },
      { id: "1.09", title: "Caution order" },
      { id: "1.10", title: "General safety requirements" }
    ]
  },
  { 
    id: 2, 
    title: "Signals and Communication",
    rules: [
      { id: "2.01", title: "Signal aspects" },
      { id: "2.02", title: "Hand signals" },
      { id: "2.03", title: "Communication procedures" },
      { id: "2.04", title: "Signal maintenance" },
      { id: "2.05", title: "Emergency communication" },
      { id: "2.06", title: "Radio communication protocols" },
      { id: "2.07", title: "Signal failure procedures" },
      { id: "2.08", title: "Automatic signaling systems" },
      { id: "2.09", title: "Level crossing signals" },
      { id: "2.10", title: "Signal testing and inspection" }
    ]
  },
  { 
    id: 3, 
    title: "Safety Procedures",
    rules: [
      { id: "3.01", title: "Safety protocols" },
      { id: "3.02", title: "Emergency procedures" },
      { id: "3.03", title: "Risk assessment" },
      { id: "3.04", title: "Personal protective equipment" },
      { id: "3.05", title: "Hazard identification" },
      { id: "3.06", title: "Safety training requirements" },
      { id: "3.07", title: "Incident reporting procedures" },
      { id: "3.08", title: "Safety audits and inspections" },
      { id: "3.09", title: "Environmental safety measures" },
      { id: "3.10", title: "Safety committee operations" }
    ]
  },
  { 
    id: 4, 
    title: "Working of Trains Generally",
    rules: [
      { id: "4.01", title: "Standard time" },
      { id: "4.02", title: "Adherence to advertised time" },
      { id: "4.03", title: "Setting watch" },
      { id: "4.04", title: "Time of attendance for train crew" },
      { id: "4.05", title: "Proper running line" },
      { id: "4.06", title: "Direction of running" },
      { id: "4.07", title: "Supply of Working Time Table and Schedule of Standard Dimensions" },
      { id: "4.08", title: "Limits of speed generally" },
      { id: "4.09", title: "Caution order" },
      { id: "4.10", title: "Limits of speed over facing points" }
    ]
  },
  { 
    id: 5, 
    title: "Station Working",
    rules: [
      { id: "5.01", title: "Station master duties" },
      { id: "5.02", title: "Platform safety" },
      { id: "5.03", title: "Passenger handling" },
      { id: "5.04", title: "Train dispatching procedures" },
      { id: "5.05", title: "Station equipment maintenance" },
      { id: "5.06", title: "Goods handling operations" },
      { id: "5.07", title: "Station security measures" },
      { id: "5.08", title: "Platform announcements" },
      { id: "5.09", title: "Station cleanliness standards" },
      { id: "5.10", title: "Emergency evacuation procedures" }
    ]
  },
  { 
    id: 6, 
    title: "Block Working",
    rules: [
      { id: "6.01", title: "Block section rules" },
      { id: "6.02", title: "Token system" },
      { id: "6.03", title: "Block instruments" },
      { id: "6.04", title: "Single line working" },
      { id: "6.05", title: "Double line operations" },
      { id: "6.06", title: "Block section maintenance" },
      { id: "6.07", title: "Communication between stations" },
      { id: "6.08", title: "Block working during emergencies" },
      { id: "6.09", title: "Token exchange procedures" },
      { id: "6.10", title: "Block section inspection" }
    ]
  },
  { 
    id: 7, 
    title: "Automatic Block System",
    rules: [
      { id: "7.01", title: "ABS operations" },
      { id: "7.02", title: "Signal failures" },
      { id: "7.03", title: "Automatic block system guidelines" },
      { id: "7.04", title: "Track circuit maintenance" },
      { id: "7.05", title: "Signal overlap requirements" },
      { id: "7.06", title: "ABS testing procedures" },
      { id: "7.07", title: "Backup systems operation" },
      { id: "7.08", title: "ABS fault diagnosis" },
      { id: "7.09", title: "System restoration procedures" },
      { id: "7.10", title: "ABS performance monitoring" }
    ]
  },
  { 
    id: 8, 
    title: "Track Maintenance",
    rules: [
      { id: "8.01", title: "Track inspection" },
      { id: "8.02", title: "Maintenance procedures" },
      { id: "8.03", title: "Track safety" },
      { id: "8.04", title: "Rail replacement guidelines" },
      { id: "8.05", title: "Ballast maintenance" },
      { id: "8.06", title: "Track geometry standards" },
      { id: "8.07", title: "Welding procedures" },
      { id: "8.08", title: "Track monitoring systems" },
      { id: "8.09", title: "Drainage maintenance" },
      { id: "8.10", title: "Track renewal procedures" }
    ]
  },
  { 
    id: 9, 
    title: "Rolling Stock",
    rules: [
      { id: "9.01", title: "Vehicle inspection" },
      { id: "9.02", title: "Maintenance schedules" },
      { id: "9.03", title: "Safety checks" },
      { id: "9.04", title: "Brake system maintenance" },
      { id: "9.05", title: "Engine performance standards" },
      { id: "9.06", title: "Coach maintenance procedures" },
      { id: "9.07", title: "Wheel and axle inspection" },
      { id: "9.08", title: "Electrical system maintenance" },
      { id: "9.09", title: "Air conditioning systems" },
      { id: "9.10", title: "Rolling stock certification" }
    ]
  },
  { 
    id: 10, 
    title: "Operating Procedures",
    rules: [
      { id: "10.01", title: "Operating guidelines" },
      { id: "10.02", title: "Crew procedures" },
      { id: "10.03", title: "Documentation" },
      { id: "10.04", title: "Train formation rules" },
      { id: "10.05", title: "Load distribution guidelines" },
      { id: "10.06", title: "Operational safety measures" },
      { id: "10.07", title: "Performance monitoring" },
      { id: "10.08", title: "Operational efficiency standards" },
      { id: "10.09", title: "Resource allocation procedures" },
      { id: "10.10", title: "Operational reporting requirements" }
    ]
  },
  { 
    id: 11, 
    title: "Emergency Protocols",
    rules: [
      { id: "11.01", title: "Emergency response" },
      { id: "11.02", title: "Accident procedures" },
      { id: "11.03", title: "Fire safety protocols" },
      { id: "11.04", title: "Medical emergency procedures" },
      { id: "11.05", title: "Natural disaster response" },
      { id: "11.06", title: "Security threat management" },
      { id: "11.07", title: "Evacuation procedures" },
      { id: "11.08", title: "Emergency communication systems" },
      { id: "11.09", title: "Crisis management protocols" },
      { id: "11.10", title: "Post-emergency recovery procedures" }
    ]
  },
  { 
    id: 12, 
    title: "Personnel Duties",
    rules: [
      { id: "12.01", title: "Staff responsibilities" },
      { id: "12.02", title: "Duty rosters" },
      { id: "12.03", title: "Performance standards" },
      { id: "12.04", title: "Training requirements" },
      { id: "12.05", title: "Code of conduct" },
      { id: "12.06", title: "Disciplinary procedures" },
      { id: "12.07", title: "Health and fitness standards" },
      { id: "12.08", title: "Uniform and appearance guidelines" },
      { id: "12.09", title: "Leave and attendance policies" },
      { id: "12.10", title: "Career development programs" }
    ]
  },
  { 
    id: 13, 
    title: "Equipment Standards",
    rules: [
      { id: "13.01", title: "Equipment specifications" },
      { id: "13.02", title: "Quality standards" },
      { id: "13.03", title: "Testing procedures" },
      { id: "13.04", title: "Calibration requirements" },
      { id: "13.05", title: "Equipment certification" },
      { id: "13.06", title: "Maintenance standards" },
      { id: "13.07", title: "Replacement criteria" },
      { id: "13.08", title: "Performance monitoring" },
      { id: "13.09", title: "Equipment safety standards" },
      { id: "13.10", title: "Technology upgrade procedures" }
    ]
  },
  { 
    id: 14, 
    title: "Documentation",
    rules: [
      { id: "14.01", title: "Record keeping" },
      { id: "14.02", title: "Report formats" },
      { id: "14.03", title: "Filing procedures" },
      { id: "14.04", title: "Document control systems" },
      { id: "14.05", title: "Data management protocols" },
      { id: "14.06", title: "Archive procedures" },
      { id: "14.07", title: "Digital documentation standards" },
      { id: "14.08", title: "Document security measures" },
      { id: "14.09", title: "Audit trail requirements" },
      { id: "14.10", title: "Document retention policies" }
    ]
  },
  { 
    id: 15, 
    title: "Training Requirements",
    rules: [
      { id: "15.01", title: "Training programs" },
      { id: "15.02", title: "Certification" },
      { id: "15.03", title: "Competency assessment" },
      { id: "15.04", title: "Refresher training schedules" },
      { id: "15.05", title: "Specialized skill development" },
      { id: "15.06", title: "Training evaluation methods" },
      { id: "15.07", title: "Instructor qualifications" },
      { id: "15.08", title: "Training facility standards" },
      { id: "15.09", title: "E-learning protocols" },
      { id: "15.10", title: "Training record maintenance" }
    ]
  },
  { 
    id: 16, 
    title: "Inspection Procedures",
    rules: [
      { id: "16.01", title: "Inspection schedules" },
      { id: "16.02", title: "Audit procedures" },
      { id: "16.03", title: "Compliance checks" },
      { id: "16.04", title: "Quality assurance protocols" },
      { id: "16.05", title: "Inspection reporting formats" },
      { id: "16.06", title: "Corrective action procedures" },
      { id: "16.07", title: "Inspector certification requirements" },
      { id: "16.08", title: "Inspection equipment standards" },
      { id: "16.09", title: "Follow-up inspection procedures" },
      { id: "16.10", title: "Inspection data analysis" }
    ]
  },
  { 
    id: 17, 
    title: "Reporting Systems",
    rules: [
      { id: "17.01", title: "Incident reporting" },
      { id: "17.02", title: "Performance reports" },
      { id: "17.03", title: "Statistical analysis" },
      { id: "17.04", title: "Monthly operational reports" },
      { id: "17.05", title: "Safety performance indicators" },
      { id: "17.06", title: "Financial reporting procedures" },
      { id: "17.07", title: "Regulatory compliance reports" },
      { id: "17.08", title: "Management information systems" },
      { id: "17.09", title: "Data validation procedures" },
      { id: "17.10", title: "Report distribution protocols" }
    ]
  }
];

const getRuleContent = (ruleId: string) => {
  if (ruleId === "4.01") {
    return `The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which shall be transmitted daily to all the principal stations of the railway at 16.00 hours in the manner prescribed.

S.R.4.01 'Standard time' as referred in GR 4.01 shall be the time displayed in GPS clock provided in the Control office and shall be transmitted to all stations at 16.00 hours by the section Controller.

For stations, which are not connected to the control, the specified stations shall pass on this information through telephone.

At all class "D" stations where there is no telephone connections either with the adjacent station or Control, the Clerk-in-charge shall check their station clocks daily with the time of the Guard of the first stopping train for the day.

(Ref: Railway Board letter No. ED/Safety-II/Rly Board letter No.2020/ Safety(A&R)/ 19/09 dated 28.07.2021) (Correction Memo 03/2021 dated 25.08.2021)`;
  }
  
  if (ruleId === "1.01") {
    return `These rules shall be observed by all railway servants and others concerned in the working of trains. They shall be read in conjunction with the relevant Acts, Rules, Regulations and Orders issued by the Government and the Railway Administration from time to time.

Every railway servant shall make himself thoroughly acquainted with these rules and shall be held responsible for their observance. No railway servant shall do anything which is likely to endanger the safety of trains or passengers.

These rules are framed for the guidance of railway servants in the discharge of their duties and for ensuring the safe and efficient working of trains. They are supplementary to and not in substitution of the statutory rules and regulations.

S.R.1.01 All railway servants shall be conversant with the General and Subsidiary Rules applicable to their duties and shall pass the prescribed tests before being allowed to work independently.`;
  }

  if (ruleId === "1.02") {
    return `In these rules, unless there is anything repugnant in the subject or context, the following terms shall have the meanings assigned to them:

(a) 'Absolute Block System' means a system of working trains on double or single line where no train is permitted to enter a block section until line clear has been received from the station in advance.

(b) 'Automatic Block System' means a system of automatic signalling where the movement of trains is governed by a series of consecutive stop signals so interconnected that they can display a proceed aspect only when the block section ahead is clear.

(c) 'Block Section' means the portion of a running line between two adjacent stations on which normally only one train is permitted at a time.

(d) 'Competent Railway Servant' means a railway servant who has been trained and passed the prescribed tests for the duties assigned to him.

(e) 'Dead End' means a line which is closed at one end.

(f) 'Facing Points' means points which face the direction of movement of a train approaching them.

(g) 'Guard' means the railway servant in charge of a train other than the Loco Pilot.

(h) 'Line Clear' means the permission given to a train to enter the block section ahead.`;
  }

  // Default content for other rules
  return `This section covers the detailed procedures and guidelines for this rule. All railway personnel must adhere to these regulations to ensure safe and efficient operations throughout the railway network.

The implementation of these rules requires comprehensive training and thorough understanding of the operational context. Personnel must be familiar with all aspects of this regulation including its application in various operational scenarios, emergency situations, and routine operations.

Compliance with this rule is mandatory for all railway staff involved in the relevant operations. Any deviation from the prescribed procedures must be reported immediately to the appropriate authorities.

Training programs must be conducted regularly to ensure all personnel are updated with the latest procedures and any amendments to this rule.`;
};

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create a default admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@railway.com' },
      update: {},
      create: {
        email: 'admin@railway.com',
        name: 'System Administrator',
        role: 'ADMIN',
      },
    });

    console.log('✅ Created/updated admin user:', adminUser.email);

    // Create the main rule book
    const ruleBook = await prisma.ruleBook.upsert({
      where: { id: 'main-rule-book' },
      update: {},
      create: {
        id: 'main-rule-book',
        title: 'Railway Operating Manual',
        description: 'Comprehensive railway operating procedures and safety guidelines',
        version: '2024.1',
        createdBy: adminUser.id,
      },
    });

    console.log('✅ Created/updated rule book:', ruleBook.title);

    // Clear existing chapters and rules to avoid duplicates
    await prisma.rule.deleteMany({
      where: {
        chapter: {
          bookId: ruleBook.id
        }
      }
    });
    
    await prisma.chapter.deleteMany({
      where: {
        bookId: ruleBook.id
      }
    });

    console.log('🧹 Cleared existing data');

    // Create chapters and rules
    for (const chapterData of chapters) {
      const chapter = await prisma.chapter.create({
        data: {
          bookId: ruleBook.id,
          number: chapterData.id,
          title: chapterData.title,
          order: chapterData.id,
        },
      });

      console.log(`📖 Created chapter ${chapter.number}: ${chapter.title}`);

      // Create rules for this chapter
      for (let i = 0; i < chapterData.rules.length; i++) {
        const ruleData = chapterData.rules[i];
        const rule = await prisma.rule.create({
          data: {
            chapterId: chapter.id,
            number: ruleData.id,
            title: ruleData.title,
            content: getRuleContent(ruleData.id),
            order: i,
          },
        });

        console.log(`📝 Created rule ${rule.number}: ${rule.title}`);
      }
    }

    // Create initial change log entry
    await prisma.changeLog.create({
      data: {
        entityType: 'RULE_BOOK',
        entityId: ruleBook.id,
        action: 'CREATE',
        changes: { 
          title: ruleBook.title,
          description: ruleBook.description,
          version: ruleBook.version 
        },
        reason: 'Initial rule book creation and data seeding',
        supportingDoc: 'System initialization',
        userId: adminUser.id,
      },
    });

    console.log('📊 Created change log entry');

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📚 Created ${chapters.length} chapters with ${chapters.reduce((acc, ch) => acc + ch.rules.length, 0)} rules`);
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}
