import React, { useEffect, useMemo, useState } from "react";
import "./Game.css";

/* ===== EN ↔ TH WORD BANK ===== */
const WORDS = [
  // Occupations
  { en: "Accountant", th: "นักบัญชี", cat: "occupation" },
  { en: "Activist", th: "นักเคลื่อนไหว, นักกิจกรรม", cat: "occupation" },
  { en: "Anthropologist", th: "นักมานุษยวิทยา", cat: "occupation" },
  { en: "Archaeologist", th: "นักโบราณคดี", cat: "occupation" },
  { en: "Architect", th: "สถาปนิก", cat: "occupation" },
  { en: "Astronomer", th: "นักดาราศาสตร์", cat: "occupation" },
  { en: "Auctioneer", th: "ผู้ขายทอดตลาด", cat: "occupation" },
  { en: "Biologist", th: "นักชีววิทยา", cat: "occupation" },
  { en: "Chairman", th: "ประธาน", cat: "occupation" },
  { en: "Chemist", th: "นักเคมี", cat: "occupation" },
  { en: "Clerk", th: "เสมียน", cat: "occupation" },
  { en: "Client", th: "ลูกค้า", cat: "occupation" },
  { en: "Composer", th: "นักแต่งเพลง", cat: "occupation" },
  { en: "Conservationist", th: "นักอนุรักษ์ (ธรรมชาติ)", cat: "occupation" },
  { en: "Contractor", th: "ผู้รับเหมา", cat: "occupation" },
  { en: "Detective", th: "นักสืบ", cat: "occupation" },
  { en: "Ecologist", th: "นักนิเวศวิทยา", cat: "occupation" },
  { en: "Educator", th: "นักการศึกษา", cat: "occupation" },
  { en: "Electrician", th: "ช่างไฟฟ้า", cat: "occupation" },
  { en: "Engineer", th: "วิศวกร", cat: "occupation" },
  { en: "Entrepreneur", th: "นักธุรกิจ", cat: "occupation" },
  { en: "Geographer", th: "นักภูมิศาสตร์", cat: "occupation" },
  { en: "Immigrant", th: "ผู้อพยพ", cat: "occupation" },
  { en: "Interpreter", th: "ล่าม", cat: "occupation" },
  { en: "Investor", th: "นักลงทุน", cat: "occupation" },
  { en: "Janitor", th: "นักการภารโรง", cat: "occupation" },
  { en: "Journalist", th: "นักหนังสือพิมพ์", cat: "occupation" },
  { en: "Judge", th: "ผู้พิพากษา", cat: "occupation" },
  { en: "Landowner", th: "เจ้าของที่ดิน", cat: "occupation" },
  { en: "Lawyer", th: "นักกฎหมาย", cat: "occupation" },
  { en: "Librarian", th: "บรรณารักษ์", cat: "occupation" },
  { en: "Master of ceremony", th: "พิธีกร", cat: "occupation" },
  { en: "Merchant", th: "พ่อค้า", cat: "occupation" },
  { en: "Narrator", th: "ผู้บรรยาย", cat: "occupation" },
  { en: "Pharmacist", th: "เภสัชกร", cat: "occupation" },
  { en: "Philosopher", th: "นักปรัชญา", cat: "occupation" },
  { en: "Physician", th: "แพทย์", cat: "occupation" },
  { en: "Politician", th: "นักการเมือง", cat: "occupation" },
  { en: "Priest", th: "นักบวช", cat: "occupation" },
  { en: "Psychiatrist", th: "จิตแพทย์", cat: "occupation" },
  { en: "Receptionist", th: "พนักงานต้อนรับ", cat: "occupation" },
  { en: "Researcher", th: "นักวิจัย", cat: "occupation" },
  { en: "Scientist", th: "นักวิทยาศาสตร์", cat: "occupation" },
  { en: "Secretary", th: "เลขานุการ", cat: "occupation" },
  { en: "Sociologist", th: "นักสังคมวิทยา", cat: "occupation" },
  { en: "Subscriber", th: "ผู้สมัครสมาชิก", cat: "occupation" },
  { en: "Surgeon", th: "ศัลยแพทย์", cat: "occupation" },
  { en: "Tenant", th: "ผู้เช่า", cat: "occupation" },
  { en: "Terrorist", th: "ผู้ก่อการร้าย", cat: "occupation" },
  { en: "Translator", th: "นักแปล", cat: "occupation" },
  // Subjects
  { en: "Anatomy", th: "กายวิภาคศาสตร์", cat: "subject" },
  { en: "Anthropology", th: "มนุษยวิทยา", cat: "subject" },
  { en: "Archaeology", th: "โบราณคดีวิทยา", cat: "subject" },
  { en: "Astrology", th: "โหราศาสตร์", cat: "subject" },
  { en: "Astronomy", th: "ดาราศาสตร์", cat: "subject" },
  { en: "Biology", th: "ชีววิทยา", cat: "subject" },
  { en: "Botany", th: "พฤกษศาสตร์", cat: "subject" },
  { en: "Cardiology", th: "หัวใจวิทยา", cat: "subject" },
  { en: "Chemistry", th: "เคมี", cat: "subject" },
  { en: "Computer science", th: "วิทยาศาสตร์คอมพิวเตอร์", cat: "subject" },
  { en: "Criminology", th: "อาชญาวิทยา", cat: "subject" },
  { en: "Dermatology", th: "โรคผิวหนังวิทยา", cat: "subject" },
  { en: "Entomology", th: "กีฏวิทยา", cat: "subject" },
  { en: "Epidemiology", th: "ระบาดวิทยา", cat: "subject" },
  { en: "Geography", th: "ภูมิศาสตร์", cat: "subject" },
  { en: "Geology", th: "ธรณีวิทยา", cat: "subject" },
  { en: "Geometry", th: "เรขาคณิต", cat: "subject" },
  { en: "History", th: "ประวัติศาสตร์", cat: "subject" },
  { en: "Literature", th: "วรรณคดี", cat: "subject" },
  { en: "Mathematics", th: "คณิตศาสตร์", cat: "subject" },
  { en: "Mythology", th: "การศึกษาเกี่ยวกับเทพปกรณัม", cat: "subject" },
  { en: "Neurology", th: "ประสาทวิทยา", cat: "subject" },
  { en: "Oncology", th: "เนื้องอกวิทยา", cat: "subject" },
  { en: "Paleontology", th: "บรรพชีวินวิทยา", cat: "subject" },
  { en: "Pathology", th: "พยาธิวิทยา", cat: "subject" },
  { en: "Philosophy", th: "ปรัชญา", cat: "subject" },
  { en: "Physical education", th: "พลศึกษา", cat: "subject" },
  { en: "Physical science", th: "วิทยาศาสตร์กายภาพ", cat: "subject" },
  { en: "Physics", th: "ฟิสิกส์", cat: "subject" },
  { en: "Psychology", th: "จิตวิทยา", cat: "subject" },
  { en: "Radiology", th: "รังสีวิทยา", cat: "subject" },
  { en: "Social studies", th: "สังคมศาสตร์", cat: "subject" },
  { en: "Sociology", th: "สังคมวิทยา", cat: "subject" },
  { en: "Theology", th: "ศาสนศาสตร์, เทววิทยา", cat: "subject" },
  { en: "Zoology", th: "สัตววิทยา", cat: "subject" },

  { en: "abandon", th: "ละทิ้ง", cat: "verbs" },
  { en: "abbreviate", th: "ย่อ, ทำให้สั้นลง", cat: "verbs" },
  { en: "abduct", th: "ลักพาตัว", cat: "verbs" },
  { en: "abide by", th: "ยอมทำตาม (กฎ)", cat: "verbs" },
  { en: "abolish", th: "ล้มเลิก, กำจัด", cat: "verbs" },
  { en: "absorb", th: "ดูดซับ", cat: "verbs" },
  { en: "accelerate", th: "เร่งความเร็ว", cat: "verbs" },
  { en: "accommodate", th: "จัดให้เข้า, จัดให้เหมาะสม", cat: "verbs" },
  { en: "accommodate", th: "ช่วยเหลือ, จัดหาให้", cat: "verbs" },
  { en: "accumulate", th: "สะสม, พอกพูน", cat: "verbs" },
  { en: "acknowledge", th: "ยอมรับ", cat: "verbs" },
  { en: "adhere", th: "ติดแน่น, ยึดมั่น", cat: "verbs" },
  { en: "adjoin", th: "ใกล้ชิด, ติดกัน", cat: "verbs" },
  { en: "adopt", th: "รับมาเลี้ยง, รับมาใช้", cat: "verbs" },
  { en: "aggravate", th: "ทำให้แย่ลง", cat: "verbs" },
  { en: "aggregate", th: "รวบรวมเข้าด้วยกัน", cat: "verbs" },
  { en: "agitate", th: "ปั่นป่วน, ปลุกระดม", cat: "verbs" },
  { en: "amend", th: "แก้ไข", cat: "verbs" },
  { en: "amplify", th: "ขยายเสียง, ขยายความให้ชัดขึ้น", cat: "verbs" },
  { en: "anticipate", th: "คาดการณ์", cat: "verbs" },
  { en: "appeal", th: "ร้องขอ, อุทธรณ์", cat: "verbs" },
  { en: "appear", th: "ปรากฏ", cat: "verbs" },
  { en: "apply", th: "สมัคร , กรอก", cat: "verbs" },
  { en: "appoint", th: "แต่งตั้ง, มอบหมาย , อ้างการนัดหมาย", cat: "verbs" },
  { en: "appreciate", th: "ชื่นชม", cat: "verbs" },
  { en: "assemble", th: "รวบรวม , ประกอบ", cat: "verbs" },
  { en: "assert", th: "ยืนยัน", cat: "verbs" },
  { en: "assess", th: "ประเมิน", cat: "verbs" },
  { en: "assume", th: "สันนิษฐานเอาเอง, เลี้ยว (ชื่อ, ตำแหน่ง)", cat: "verbs" },
  { en: "banish", th: "เนรเทศ", cat: "verbs" },
  { en: "bargain", th: "ต่อรอง", cat: "verbs" },
  { en: "barter", th: "แลกเปลี่ยนสินค้า", cat: "verbs" },
  { en: "behave", th: "ประพฤติตัว", cat: "verbs" },
  { en: "belittle", th: "ดูถูก, ด้อยค่า", cat: "verbs" },
  { en: "benefit", th: "ให้ประโยชน์", cat: "verbs" },
  { en: "border", th: "ติดขอบเขต", cat: "verbs" },
  { en: "broaden", th: "ทำให้กว้างขึ้น", cat: "verbs" },
  { en: "calculate", th: "คำนวณ", cat: "verbs" },
  { en: "capture", th: "จับตัว", cat: "verbs" },
  { en: "carve", th: "แกะสลัก", cat: "verbs" },
  { en: "caution", th: "เตือน", cat: "verbs" },
  { en: "cease", th: "หยุด, ยุติ", cat: "verbs" },
  { en: "certify", th: "รับรอง", cat: "verbs" },
  { en: "cherish", th: "ทะนุถนอม", cat: "verbs" },
  { en: "circulate", th: "หมุนเวียน, ไหลเวียน", cat: "verbs" },
  { en: "classify", th: "แบ่งประเภท, จัดให้เป็นเรื่องลับ", cat: "verbs" },
  { en: "clench", th: "กำแน่น", cat: "verbs" },
  { en: "coil", th: "ขดตัว, ขดให้เป็นวง", cat: "verbs" },
  { en: "coin", th: "สร้างคำใหม่", cat: "verbs" },
  { en: "coincide", th: "เกิดขึ้นพร้อมกัน, เกิดเวลาใกล้เคียงกัน", cat: "verbs" },
  { en: "collaborate", th: "ร่วมมือ", cat: "verbs" },
  { en: "collide", th: "ชน, ประสานงา", cat: "verbs" },
  { en: "compile", th: "รวบรวม", cat: "verbs" },
  { en: "compliment", th: "ชื่นชม", cat: "verbs" },
  { en: "comply", th: "ยอมทำตาม", cat: "verbs" },
  { en: "compress", th: "บีบอัด", cat: "verbs" },
  { en: "confide", th: "บอกความลับ", cat: "verbs" },
  { en: "confront", th: "เผชิญหน้า", cat: "verbs" },
  { en: "conquer", th: "พิชิต, เอาชนะ", cat: "verbs" },
  { en: "contemplate", th: "ครุ่นคิด", cat: "verbs" },
  { en: "contradict", th: "ขัดแย้ง", cat: "verbs" },
  { en: "contribute", th: "มีส่วนช่วย", cat: "verbs" },
  { en: "convert", th: "เปลี่ยน", cat: "verbs" },
  { en: "convey", th: "สื่อสาร, ถ่ายทอด, ลำเลียง", cat: "verbs" },
  { en: "correlate", th: "มีสัมพันธ์ร่วมกัน, สัมพันธ์กัน", cat: "verbs" },
  { en: "corrode", th: "กัดกร่อน", cat: "verbs" },
  { en: "culminate", th: "เป็นผลให้เกิด", cat: "verbs" },
  { en: "cultivate", th: "เพาะปลูก, เตรียมดิน, พัฒนา", cat: "verbs" },
  { en: "decay", th: "ผุพัง, เสื่อมถอย", cat: "verbs" },
  { en: "deceive", th: "หลอกลวง", cat: "verbs" },
  { en: "decompose", th: "ย่อยสลาย, เน่าเปื่อย", cat: "verbs" },
  { en: "dedicate", th: "อุทิศ", cat: "verbs" },
  { en: "deflate", th: "ปล่อยลมออก, ทำให้แฟบ", cat: "verbs" },
  { en: "deform", th: "ผิดรูปร่าง", cat: "verbs" },
  { en: "delegate", th: "มอบให้ทำแทน", cat: "verbs" },
  { en: "demolish", th: "ทำลาย, รื้อทิ้ง", cat: "verbs" },
  { en: "diagnose", th: "วินิจฉัย (แพทย์)", cat: "verbs" },
  { en: "digest", th: "ย่อย", cat: "verbs" },
  { en: "dilute", th: "เจือจาง", cat: "verbs" },
  { en: "diminish", th: "ลดลง, เล็กลง", cat: "verbs" },
  { en: "discharge", th: "ปลดออก, ขับออก", cat: "verbs" },
  { en: "disclose", th: "เปิดเผย", cat: "verbs" },
  { en: "disrupt", th: "ขัดขวาง", cat: "verbs" },
  { en: "dissipate", th: "ค่อยๆ ลดลง", cat: "verbs" },
  { en: "distribute", th: "แจกจ่าย", cat: "verbs" },
  { en: "disturb", th: "รบกวน", cat: "verbs" },
  { en: "duplicate", th: "ทำสำเนา, จำลอง", cat: "verbs" },
  { en: "educate", th: "ให้ความรู้", cat: "verbs" },
  { en: "eject", th: "ขับไล่, ตีออกจาก", cat: "verbs" },
  { en: "elevate", th: "ยกระดับสูงขึ้น", cat: "verbs" },
  { en: "eliminate", th: "กำจัด", cat: "verbs" },
  { en: "embark", th: "ขึ้นยานพาหนะ", cat: "verbs" },
  { en: "embrace", th: "สวมกอด, นำมาใช้", cat: "verbs" },
  { en: "emerge", th: "โผล่ขึ้นมา", cat: "verbs" },
  { en: "emigrate", th: "ย้ายถิ่นฐาน (ออกนอกประเทศ)", cat: "verbs" },
  { en: "emit", th: "ปล่อยออก (ควัน, เสียง, แสง)", cat: "verbs" },
  { en: "emphasize", th: "เน้น", cat: "verbs" },
  { en: "empower", th: "ให้อำนาจ", cat: "verbs" },
  { en: "encircle", th: "ล้อมรอบ", cat: "verbs" },
  { en: "encourage", th: "ส่งเสริม, สนับสนุน", cat: "verbs" },
  { en: "end", th: "จบ", cat: "verbs" },
  { en: "endanger", th: "ทำให้ตกอยู่ในอันตราย", cat: "verbs" },
  { en: "endure", th: "อดทน", cat: "verbs" },
  { en: "enhance", th: "เสริม, ทำให้ดีขึ้น", cat: "verbs" },
  { en: "entitle", th: "ให้สิทธิ", cat: "verbs" },
  { en: "eradicate", th: "กำจัด, ถอนรากถอนโคน", cat: "verbs" },
  { en: "erect", th: "ตั้งขึ้น", cat: "verbs" },
  { en: "erupt", th: "ปะทุ", cat: "verbs" },
  { en: "evaluate", th: "ประเมิน", cat: "verbs" },
  { en: "evaporate", th: "ระเหย", cat: "verbs" },
  { en: "evolve", th: "วิวัฒนาการ", cat: "verbs" },
  { en: "exasperate", th: "ทำให้โกรธ, ทำให้โมโห", cat: "verbs" },
  { en: "excavate", th: "ขุดค้น", cat: "verbs" },
  { en: "execute", th: "ประหาร, ดำเนินการ", cat: "verbs" },
  { en: "exploit", th: "เอาเปรียบ", cat: "verbs" },
  { en: "fabricate", th: "ปลอมแปลง", cat: "verbs" },
  { en: "facilitate", th: "ทำให้ง่ายขึ้น, อำนวยความสะดวก", cat: "verbs" },
  { en: "familiarize", th: "ทำให้คุ้นเคย", cat: "verbs" },
  { en: "fascinate", th: "ทำให้หลงใหล", cat: "verbs" },
  { en: "fasten", th: "รัดแน่น", cat: "verbs" },
  { en: "fluctuate", th: "ผันผวน", cat: "verbs" },
  { en: "forbid", th: "ห้าม", cat: "verbs" },
  { en: "forecast", th: "พยากรณ์", cat: "verbs" },
  { en: "formulate", th: "คิดสูตร, ตำรา", cat: "verbs" },
  { en: "frustrate", th: "ทำให้หงุดหงิด", cat: "verbs" },
  { en: "gamble", th: "พนัน", cat: "verbs" },
  { en: "generate", th: "สร้าง, ผลิต", cat: "verbs" },
  { en: "glisten", th: "ส่องแสงระยิบระยับ", cat: "verbs" },
  { en: "gnaw", th: "แทะ", cat: "verbs" },
  { en: "growl", th: "คำราม", cat: "verbs" },
  { en: "hamper", th: "ขัดขวาง", cat: "verbs" },
  { en: "harvest", th: "เก็บเกี่ยว", cat: "verbs" },
  { en: "humiliate", th: "ทำให้อับอาย", cat: "verbs" },
  { en: "hustle", th: "เร่งรีบ", cat: "verbs" },
  { en: "identify", th: "ระบุ", cat: "verbs" },
  { en: "illuminate", th: "ส่องสว่าง", cat: "verbs" },
  { en: "illustrate", th: "วาดภาพประกอบ, อธิบายให้เข้าใจ", cat: "verbs" },
  { en: "imitate", th: "เลียนแบบ", cat: "verbs" },
  { en: "immigrate", th: "ย้ายถิ่นฐาน (เข้าประเทศ)", cat: "verbs" },
  { en: "impose", th: "บังคับใช้", cat: "verbs" },
  { en: "incline", th: "ลาดเอียง", cat: "verbs" },
  { en: "incorporate", th: "รวมเข้าด้วยกัน", cat: "verbs" },
  { en: "incur", th: "ประสบกับ (เรื่องไม่ดี)", cat: "verbs" },
  { en: "indulge", th: "ปล่อยตัวตามใจ", cat: "verbs" },
  { en: "infect", th: "ทำให้ติดเชื้อ", cat: "verbs" },
  { en: "inform", th: "บอกกล่าว", cat: "verbs" },
  { en: "inherit", th: "รับมรดก", cat: "verbs" },
  { en: "inject", th: "ฉีด", cat: "verbs" },
  { en: "insist", th: "ยืนกราน", cat: "verbs" },
  { en: "inspect", th: "ตรวจสอบ", cat: "verbs" },
  { en: "insulate", th: "หุ้มด้วยฉนวน", cat: "verbs" },
  { en: "interfere", th: "แทรก, ขัดขวาง", cat: "verbs" },
  { en: "irrigate", th: "รดน้ำ, ชำระล้างด้วยของเหลว", cat: "verbs" },
  { en: "isolate", th: "แยกตัว", cat: "verbs" },
  { en: "jeopardize", th: "ทำให้มีอันตราย", cat: "verbs" },
  { en: "justify", th: "ให้เหตุผล", cat: "verbs" },
  { en: "liberate", th: "ปล่อยให้เป็นอิสระ", cat: "verbs" },
  { en: "lubricate", th: "หล่อลื่น", cat: "verbs" },
  { en: "magnify", th: "ขยาย, เพิ่มขนาด", cat: "verbs" },
  { en: "manifest", th: "แสดงให้เห็นชัดแจ้ง", cat: "verbs" },
  { en: "manipulate", th: "ควบคุมให้ทำตาม", cat: "verbs" },
  { en: "manufacture", th: "ผลิต", cat: "verbs" },
  { en: "meditate", th: "ทำสมาธิ", cat: "verbs" },
  { en: "multiply", th: "เพิ่มจำนวน", cat: "verbs" },
  { en: "necessitate", th: "ทำให้จำเป็น", cat: "verbs" },
  { en: "neglect", th: "เพิกเฉย, ไม่ใส่ใจ", cat: "verbs" },
  { en: "negotiate", th: "เจรจาต่อรอง", cat: "verbs" },
  { en: "nourish", th: "บำรุงเลี้ยงดู", cat: "verbs" },
  { en: "object", th: "คัดค้าน", cat: "verbs" },
  { en: "oblige", th: "บังคับให้ทำ", cat: "verbs" },
  { en: "obscure", th: "ปิดบัง, อำพราง", cat: "verbs" },
  { en: "observe", th: "สังเกต", cat: "verbs" },
  { en: "occur", th: "เกิดขึ้น", cat: "verbs" },
  { en: "omit", th: "ละไว้", cat: "verbs" },
  { en: "orbit", th: "โคจร", cat: "verbs" },
  { en: "originate", th: "มีต้นกำเนิดจาก", cat: "verbs" },
  { en: "paralyse", th: "ทำให้เป็นอัมพาต", cat: "verbs" },
  { en: "participate", th: "เข้าร่วม", cat: "verbs" },
  { en: "penetrate", th: "เจาะทะลวง", cat: "verbs" },
  { en: "perceive", th: "รับรู้", cat: "verbs" },
  { en: "perish", th: "ทำลายล้าง", cat: "verbs" },
  { en: "permit", th: "อนุญาต", cat: "verbs" },
  { en: "perplex", th: "ทำให้งง", cat: "verbs" },
  { en: "pioneer", th: "บุกเบิก", cat: "verbs" },
  { en: "plummet", th: "ตกฮวบ", cat: "verbs" },
  { en: "plunder", th: "ขโมย", cat: "verbs" },
  { en: "plunge", th: "ตก, ดิ่งลง", cat: "verbs" },
  { en: "polish", th: "ขัดเงา", cat: "verbs" },
  { en: "postpone", th: "เลื่อนออกไป", cat: "verbs" },
  { en: "prescribe", th: "สั่งจ่ายยา", cat: "verbs" },
  { en: "preserve", th: "ถนอม, อนุรักษ์", cat: "verbs" },
  { en: "prevail", th: "มีอำนาจเหนือ", cat: "verbs" },
  { en: "probe", th: "พิสูจน์, ตรวจสอบ", cat: "verbs" },
  { en: "proceed", th: "ดำเนินการ", cat: "verbs" },
  { en: "prohibit", th: "ห้าม", cat: "verbs" },
  { en: "propel", th: "ขับเคลื่อน", cat: "verbs" },
  { en: "propose", th: "เสนอ", cat: "verbs" },
  { en: "qualify", th: "มีคุณสมบัติ", cat: "verbs" },
  { en: "quench", th: "ดับกระหาย, สนองความต้องการ", cat: "verbs" },
  { en: "radiate", th: "แผ่รังสี", cat: "verbs" },
  { en: "ramble", th: "เตลิดแล่น", cat: "verbs" },
  { en: "rebel", th: "ก่อกบฏ, ขัดขืน", cat: "verbs" },
  { en: "recede", th: "ถอย", cat: "verbs" },
  { en: "recite", th: "ท่อง", cat: "verbs" },
  { en: "rectify", th: "แก้ไขให้ถูก", cat: "verbs" },
  { en: "refine", th: "ขัดเกลา", cat: "verbs" },
  { en: "refute", th: "พิสูจน์ข้อกล่าวหา", cat: "verbs" },
  { en: "regulate", th: "ควบคุม", cat: "verbs" },
  { en: "relieve", th: "บรรเทา", cat: "verbs" },
  { en: "relish", th: "เพลิดเพลินไปกับ", cat: "verbs" },
  { en: "repel", th: "ขับไล่", cat: "verbs" },
  { en: "reveal", th: "เปิดเผย", cat: "verbs" },
  { en: "sanitise", th: "ฆ่าเชื้อ", cat: "verbs" },
  { en: "satisfy", th: "ทำให้พอใจ", cat: "verbs" },
  { en: "settle", th: "ตั้งรกราก", cat: "verbs" },
  { en: "shatter", th: "แตกเป็นเสี่ยงๆ", cat: "verbs" },
  { en: "shelter", th: "ให้อยู่, ให้ที่หลบภัย", cat: "verbs" },
  { en: "shriek", th: "กรีดร้อง", cat: "verbs" },
  { en: "shrink", th: "หดตัว", cat: "verbs" },
  { en: "shuffle", th: "เดินสับเท้า, ผสม, สับไพ่", cat: "verbs" },
  { en: "signify", th: "แสดงให้รู้ว่า", cat: "verbs" },
  { en: "skyrocket", th: "พุ่งสูงขึ้น", cat: "verbs" },
  { en: "slander", th: "ใส่ร้าย", cat: "verbs" },
  { en: "smuggle", th: "ลักลอบขน", cat: "verbs" },
  { en: "soar", th: "พุ่งสูง, ลอย", cat: "verbs" },
  { en: "specialise", th: "เชี่ยวชาญ", cat: "verbs" },
  { en: "specify", th: "กำหนด, ระบุ", cat: "verbs" },
  { en: "startle", th: "ทำให้ตกใจ", cat: "verbs" },
  { en: "stimulate", th: "กระตุ้น", cat: "verbs" },
  { en: "strengthen", th: "ทำให้แข็งแรงขึ้น", cat: "verbs" },
  { en: "submerge", th: "จุ่มน้ำ, จมอยู่ใต้น้ำ", cat: "verbs" },
  { en: "supplement", th: "เสริม, เพิ่มเติม", cat: "verbs" },
  { en: "surrender", th: "ยอมจำนน", cat: "verbs" },
  { en: "suspect", th: "สงสัย", cat: "verbs" },
  { en: "suspend", th: "หยุดชั่วคราว", cat: "verbs" },
  { en: "sympathise", th: "เห็นใจ", cat: "verbs" },
  { en: "tackle", th: "จัดการปัญหา", cat: "verbs" },
  { en: "terminate", th: "ยุติ", cat: "verbs" },
  { en: "transfer", th: "โอนย้าย", cat: "verbs" },
  { en: "transform", th: "เปลี่ยนรูปร่าง", cat: "verbs" },
  { en: "transmit", th: "ส่งผ่าน", cat: "verbs" },
  { en: "trigger", th: "ทำให้เกิด", cat: "verbs" },
  { en: "undergo", th: "ประสบเหตุ", cat: "verbs" },
  { en: "underline", th: "เน้นความสำคัญ", cat: "verbs" },
  { en: "utilise", th: "ใช้ประโยชน์", cat: "verbs" },
  { en: "vaccinate", th: "ให้วัคซีน", cat: "verbs" },
  { en: "vanish", th: "หายไป", cat: "verbs" },
  { en: "vary", th: "เปลี่ยนแปลง", cat: "verbs" },
  { en: "vibrate", th: "สั่น", cat: "verbs" },
  { en: "violate", th: "ฝ่าฝืน", cat: "verbs" },
  { en: "volunteer", th: "อาสา", cat: "verbs" },
  { en: "waive", th: "งดเว้นให้", cat: "verbs" },
  { en: "withdraw", th: "ถอน", cat: "verbs" },
  { en: "wither", th: "ร่วงโรย", cat: "verbs" },
  { en: "withhold", th: "ระงับ", cat: "verbs" },
  { en: "witness", th: "เป็นพยาน", cat: "verbs" },
  { en: "wrinkle", th: "ทำให้เป็นรอยย่น", cat: "verbs" },

  { en: "abundant", th: "มากมาย", cat: "adjective" },
  { en: "adjacent (to)", th: "อยู่ติดกับ", cat: "adjective" },
  { en: "advanced", th: "ล้ำสมัย, ขั้นสูง", cat: "adjective" },
  { en: "affordable", th: "ราคาจับต้องได้", cat: "adjective" },
  { en: "accessible", th: "เข้าถึงได้ง่าย", cat: "adjective" },
  { en: "accurate", th: "แม่นยำ, ถูกต้อง", cat: "adjective" },
  { en: "accustomed (to)", th: "คุ้นชินกับ", cat: "adjective" },
  { en: "additional", th: "เพิ่มเติม", cat: "adjective" },
  { en: "adequate", th: "เพียงพอ", cat: "adjective" },
  { en: "ambitious", th: "มุ่งมั่น, ทะเยอทะยาน", cat: "adjective" },
  { en: "adaptive", th: "ปรับตัวได้ดี", cat: "adjective" },
  { en: "ample", th: "มากมาย, เหลือเฟือ", cat: "adjective" },
  { en: "ancient", th: "โบราณ, เก่าแก่", cat: "adjective" },
  { en: "annual", th: "ประจำปี", cat: "adjective" },
  { en: "anonymous", th: "นิรนาม, ไม่ระบุชื่อ", cat: "adjective" },
  { en: "anxious", th: "วิตกกังวล", cat: "adjective" },
  { en: "apparent", th: "ชัดเจน", cat: "adjective" },
  { en: "appropriate", th: "เหมาะสม", cat: "adjective" },
  { en: "assorted", th: "ผสม, หลากหลาย", cat: "adjective" },
  { en: "athletic", th: "แข็งแรงเหมือนนักกีฬา, ทางกีฬา", cat: "adjective" },
  { en: "attainable", th: "เป็นไปได้, (เป้า) บรรลุได้", cat: "adjective" },
  { en: "attractive", th: "มีเสน่ห์ดึงดูด", cat: "adjective" },
  { en: "authentic", th: "แท้", cat: "adjective" },
  { en: "beneficial", th: "เป็นประโยชน์, เป็นผลดี", cat: "adjective" },
  { en: "benign", th: "ใจดี, เมตตา, ไม่อันตราย (เนื้องอก)", cat: "adjective" },
  { en: "capable", th: "สามารถ", cat: "adjective" },
  { en: "careful", th: "ระวัง", cat: "adjective" },
  { en: "casual", th: "สบายๆ, ไม่ทางการ", cat: "adjective" },
  { en: "cautious", th: "ระมัดระวัง", cat: "adjective" },
  { en: "certain", th: "แน่นอน", cat: "adjective" },
  { en: "classified", th: "ที่แบ่งออกเป็นประเภท, เป็นความลับ", cat: "adjective" },
  { en: "comfortable", th: "สะดวกสบาย", cat: "adjective" },
  { en: "common", th: "ทั่วไป, ธรรมดา, ร่วมกัน", cat: "adjective" },
  { en: "compatible", th: "เข้ากันได้", cat: "adjective" },
  { en: "competitive", th: "ที่มีการแข่งขัน, แข่งขันกัน", cat: "adjective" },
  { en: "complementary", th: "เป็นประโยชน์, เสริมกัน (เมื่ออยู่คู่กัน)", cat: "adjective" },
  { en: "complicated", th: "ซับซ้อน", cat: "adjective" },
  { en: "complimentary", th: "ให้ฟรี, ไม่มีค่าใช้จ่าย", cat: "adjective" },
  { en: "condensed", th: "ข้น", cat: "adjective" },
  { en: "confidential", th: "เป็นความลับ", cat: "adjective" },
  { en: "confusing", th: "ชวนสับสน", cat: "adjective" },
  { en: "consecutive", th: "ต่อเนื่อง", cat: "adjective" },
  { en: "considerable", th: "มาก, สำคัญ", cat: "adjective" },
  { en: "constant", th: "คงที่, สม่ำเสมอตลอดเวลา", cat: "adjective" },
  { en: "content", th: "พอใจ", cat: "adjective" },
  { en: "critical", th: "สำคัญ, วิกฤต", cat: "adjective" },
  { en: "curious", th: "สงสัย, แปลกประหลาด", cat: "adjective" },
  { en: "cutting-edge", th: "ล้ำสมัย", cat: "adjective" },
  { en: "dedicated", th: "อุทิศ, ทุ่มเท", cat: "adjective" },
  { en: "deliberate", th: "จงใจ, ตั้งใจ", cat: "adjective" },
  { en: "delicate", th: "บอบบาง", cat: "adjective" },
  { en: "detailed", th: "ละเอียด", cat: "adjective" },
  { en: "disposable", th: "ที่ใช้แล้วทิ้ง", cat: "adjective" },
  { en: "distinctive", th: "เด่น, มีลักษณะเฉพาะ", cat: "adjective" },
  { en: "diverse", th: "หลากหลาย", cat: "adjective" },
  { en: "domestic", th: "ในครัวเรือน, ในประเทศ", cat: "adjective" },
  { en: "doubtful", th: "สงสัย", cat: "adjective" },
  { en: "dramatic", th: "เปลี่ยนแปลงกระทันหัน, อย่างมาก", cat: "adjective" },
  { en: "durable", th: "ทนทาน", cat: "adjective" },
  { en: "eager", th: "กระตือรือร้น", cat: "adjective" },
  { en: "edible", th: "กินได้", cat: "adjective" },
  { en: "efficient", th: "มีประสิทธิภาพ", cat: "adjective" },
  { en: "elaborate", th: "ประณีต, ละเอียด", cat: "adjective" },
  { en: "elderly", th: "สูงอายุ", cat: "adjective" },
  { en: "elementary", th: "เบื้องต้น, ไม่ซับซ้อน", cat: "adjective" },
  { en: "eligible", th: "มีสิทธิ, มีคุณสมบัติเหมาะ", cat: "adjective" },
  { en: "enormous", th: "ใหญ่โต, มากมาย", cat: "adjective" },
  { en: "enthusiastic", th: "กระตือรือร้น", cat: "adjective" },
  { en: "equivalent", th: "ที่เทียบเท่ากัน", cat: "adjective" },
  { en: "exact", th: "ถูกต้อง, แม่นยำ, เป๊ะ", cat: "adjective" },
  { en: "exceptional", th: "ดีมาก", cat: "adjective" },
  { en: "excessive", th: "มากเกิน", cat: "adjective" },
  { en: "exclusive", th: "พิเศษ (เฉพาะบางคน)", cat: "adjective" },
  { en: "exotic", th: "ประหลาด", cat: "adjective" },
  { en: "experienced", th: "มีประสบการณ์เยอะ", cat: "adjective" },
  { en: "exquisite", th: "สวยงาม", cat: "adjective" },
  { en: "extensive", th: "ครอบคลุม", cat: "adjective" },
  { en: "eye-catching", th: "เด่นสะดุดตา", cat: "adjective" },
  { en: "fabulous", th: "เลิศเลอ, สวยงาม", cat: "adjective" },
  { en: "familiar", th: "คุ้นเคย", cat: "adjective" },
  { en: "fascinating", th: "น่าทึ่ง", cat: "adjective" },
  { en: "favorable", th: "เป็นที่ชื่นชอบ", cat: "adjective" },
  { en: "feasible", th: "เป็นไปได้", cat: "adjective" },
  { en: "financial", th: "ทางการเงิน", cat: "adjective" },
  { en: "firsthand", th: "โดยตรง, ด้วยตัวเอง", cat: "adjective" },
  { en: "flammable", th: "ติดไฟง่าย", cat: "adjective" },
  { en: "flawless", th: "ไร้ที่ติ, ไร้ตำหนิ", cat: "adjective" },
  { en: "flexible", th: "ยืดหยุ่นได้", cat: "adjective" },
  { en: "fragile", th: "เปราะบาง", cat: "adjective" },
  { en: "fluent", th: "คล่อง", cat: "adjective" },
  { en: "fundamental", th: "เป็นพื้นฐาน, เป็นรากฐาน", cat: "adjective" },
  { en: "generous", th: "ใจดีมีเมตตา", cat: "adjective" },
  { en: "grateful", th: "ที่รู้สึกขอบคุณ", cat: "adjective" },
  { en: "gradual", th: "ที่ค่อยๆ เกิดขึ้น", cat: "adjective" },
  { en: "harmful", th: "อันตราย", cat: "adjective" },
  { en: "hearty", th: "ที่มีชีวิตชีวา, เอิบอิ่ม (อาหาร)", cat: "adjective" },
  { en: "hesitant", th: "ลังเล", cat: "adjective" },
  { en: "identical", th: "เหมือนกัน", cat: "adjective" },
  { en: "immense", th: "ใหญ่มาก", cat: "adjective" },
  { en: "immobile", th: "ที่ไม่เคลื่อนไหว", cat: "adjective" },
  { en: "impressive", th: "น่าประทับใจ", cat: "adjective" },
  { en: "incidental", th: "บังเอิญ, ไม่ได้ตั้งใจ", cat: "adjective" },
  { en: "independent", th: "พึ่งพาตัวเองได้, เป็นอิสระ", cat: "adjective" },
  { en: "inexperienced", th: "ไร้ประสบการณ์", cat: "adjective" },
  { en: "inefficient", th: "ไร้ประสิทธิภาพ", cat: "adjective" },
  { en: "inevitable", th: "ที่เลี่ยงไม่ได้", cat: "adjective" },
  { en: "influential", th: "ทรงอิทธิพล", cat: "adjective" },
  { en: "informal", th: "ไม่เป็นทางการ", cat: "adjective" },
  { en: "informative", th: "ที่ให้ข้อมูลเป็นประโยชน์", cat: "adjective" },
  { en: "innovative", th: "สร้างสรรค์, เป็นนวัตกรรม", cat: "adjective" },
  { en: "intact", th: "ไม่เสียหาย, ไม่ปนเปื้อน", cat: "adjective" },
  { en: "intermediate", th: "ตรงกลาง, ระหว่างกลาง", cat: "adjective" },
  { en: "international", th: "ระหว่างประเทศ", cat: "adjective" },
  { en: "impolite", th: "ไม่สุภาพ", cat: "adjective" },
  { en: "knowledgeable", th: "มีความรู้", cat: "adjective" },
  { en: "lasting", th: "อยู่ได้ยาว, ยั่งยืน", cat: "adjective" },
  { en: "legal", th: "ถูกกฎหมาย", cat: "adjective" },
  { en: "lengthy", th: "ยืดยาว", cat: "adjective" },
  { en: "lightweight", th: "น้ำหนักเบา", cat: "adjective" },
  { en: "local", th: "ท้องถิ่น", cat: "adjective" },
  { en: "luxurious", th: "หรูหรา", cat: "adjective" },
  { en: "magnificent", th: "งดงาม", cat: "adjective" },
  { en: "managerial", th: "เกี่ยวกับการจัดการ", cat: "adjective" },
  { en: "mandatory", th: "ที่จำเป็นต้องทำ, ที่บังคับให้ทำ", cat: "adjective" },
  { en: "memorable", th: "น่าจดจำ", cat: "adjective" },
  { en: "mindful", th: "ระมัดระวัง, ใส่ใจ", cat: "adjective" },
  { en: "moderate", th: "ปานกลาง", cat: "adjective" },
  { en: "multiple", th: "มากมาย", cat: "adjective" },
  { en: "narrow", th: "แคบ", cat: "adjective" },
  { en: "native", th: "พื้นเมือง", cat: "adjective" },
  { en: "neutral", th: "เป็นกลาง", cat: "adjective" },
  { en: "non-profit", th: "ที่ไม่แสวงหากำไร", cat: "adjective" },
  { en: "noticeable", th: "ที่สังเกตได้ง่าย", cat: "adjective" },
  { en: "numerous", th: "มากมาย", cat: "adjective" },
  { en: "nutritious", th: "มีคุณค่าทางโภชนาการ", cat: "adjective" },
  { en: "obsolete", th: "ล้าสมัย", cat: "adjective" },
  { en: "obvious", th: "ชัดเจน", cat: "adjective" },
  { en: "official", th: "ทางการ", cat: "adjective" },
  { en: "ongoing", th: "ที่กำลังดำเนินอยู่", cat: "adjective" },
  { en: "opposite", th: "ตรงข้าม", cat: "adjective" },
  { en: "optimistic", th: "ที่มองโลกในแง่ดี", cat: "adjective" },
  { en: "ordinary", th: "ธรรมดาทั่วไป", cat: "adjective" },
  { en: "outdated", th: "ล้าสมัย", cat: "adjective" },
  { en: "outstanding", th: "โดดเด่น", cat: "adjective" },
  { en: "paramount", th: "สำคัญ", cat: "adjective" },
  { en: "partial", th: "เฉพาะบางส่วน", cat: "adjective" },
  { en: "particular", th: "เฉพาะเจาะจง", cat: "adjective" },
  { en: "patient", th: "อดทน", cat: "adjective" },
  { en: "periodic", th: "เกิดเป็นช่วงเวลา, เป็นช่วงๆ", cat: "adjective" },
  { en: "permanent", th: "ถาวร", cat: "adjective" },
  { en: "persistent", th: "เรื้อรัง, ดื้อดึง", cat: "adjective" },
  { en: "persuasive", th: "โน้มน้าวใจได้", cat: "adjective" },
  { en: "plentiful", th: "มากมาย", cat: "adjective" },
  { en: "portable", th: "พกพาได้", cat: "adjective" },
  { en: "potential", th: "ที่อาจเกิดขึ้น", cat: "adjective" },
  { en: "practical", th: "ที่ปฏิบัติได้จริง", cat: "adjective" },

];

/* ===== utils ===== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function useTimer(active) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [active]);
  return sec;
}

/* ===== component ===== */
export default function WordMatchingGame() {
  const [cat, setCat] = useState("all");
  const [count, setCount] = useState(12);
  const [direction, setDirection] = useState("EN→TH");
  const [started, setStarted] = useState(false);

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const pool = useMemo(
    () => (cat === "all" ? WORDS : WORDS.filter((w) => w.cat === cat)),
    [cat]
  );
  const time = useTimer(started && matched.size < left.length);

  const startGame = () => {
    const sample = shuffle(pool).slice(0, Math.min(count, pool.length));
    const pairs = sample.map((w, idx) => ({ id: idx, en: w.en, th: w.th }));

    const leftSide =
      direction === "EN→TH"
        ? pairs.map((p) => ({ id: p.id, label: p.en }))
        : pairs.map((p) => ({ id: p.id, label: p.th }));

    const rightSide =
      direction === "EN→TH"
        ? pairs.map((p) => ({ id: p.id, label: p.th }))
        : pairs.map((p) => ({ id: p.id, label: p.en }));

    setLeft(shuffle(leftSide));
    setRight(shuffle(rightSide));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched(new Set());
    setMoves(0);
    setMistakes(0);
    setStarted(true);
  };

  const tryMatch = (side, id) => {
    if (!started || matched.has(id)) return;
    if (side === "L") setSelectedLeft(id === selectedLeft ? null : id);
    else setSelectedRight(id === selectedRight ? null : id);
  };

  useEffect(() => {
    if (selectedLeft == null || selectedRight == null) return;
    setMoves((m) => m + 1);

    if (selectedLeft === selectedRight) {
      const next = new Set(matched);
      next.add(selectedLeft);
      setMatched(next);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setMistakes((e) => e + 1);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeft, selectedRight]);

  const allMatched = started && matched.size === left.length && left.length > 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Word Matching Game — EN↔TH
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600">
          เลือกหมวด จำนวนคำ และทิศทาง แล้วเริ่มเล่นได้เลย!
        </p>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-2xl border p-2 bg-white shadow-sm"
            >
              <option value="all">All (ทั้งหมด)</option>
              <option value="occupation">Occupations (อาชีพ)</option>
              <option value="subject">Subjects (สาขาวิชา)</option>
              <option value="verbs">Verbs (กริยา)</option>
              <option value="adjective">Adjective (Adj.)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Pairs
            </label>
            <input
              type="range"
              min={6}
              max={20}
              step={2}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <div className="text-sm">{count} pairs</div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Direction
            </label>
            <div className="flex gap-2">
              {["EN→TH", "TH→EN"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`px-3 py-2 rounded-2xl border shadow-sm ${
                    direction === d ? "bg-slate-900 text-white" : "bg-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="w-full px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow hover:shadow-md transition"
            >
              {started ? "Restart" : "Start"}
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-white shadow">
            Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
          <span className="px-3 py-1 rounded-full bg-white shadow">
            Moves: {moves}
          </span>
          <span className="px-3 py-1 rounded-full bg-white shadow">
            Mistakes: {mistakes}
          </span>
          {allMatched && (
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white shadow">
              🎉 Completed!
            </span>
          )}
        </div>

        {/* Game board */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardColumn
            title={direction === "EN→TH" ? "ENGLISH" : "ภาษาไทย"}
            items={left}
            selected={selectedLeft}
            matched={matched}
            onPick={(id) => tryMatch("L", id)}
          />
          <CardColumn
            title={direction === "EN→TH" ? "ภาษาไทย" : "ENGLISH"}
            items={right}
            selected={selectedRight}
            matched={matched}
            onPick={(id) => tryMatch("R", id)}
          />
        </div>

        {/* Glossary */}
        <details className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <summary className="font-semibold cursor-pointer">
            Full glossary (คลังคำศัพท์ทั้งหมด)
          </summary>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {WORDS.map((w, i) => (
              <div
                key={i}
                className="flex justify-between gap-2 bg-slate-50 rounded-xl p-2"
              >
                <span className="font-medium">{w.en}</span>
                <span className="text-slate-600">{w.th}</span>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}

/* column */
function CardColumn({ title, items, selected, matched, onPick }) {
  return (
    <div>
      <div className="mb-2 text-slate-500 uppercase tracking-wide text-xs">
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it) => {
          const isMatched = matched.has(it.id);
          const isSelected = selected === it.id;
          return (
            <button
              key={it.id + it.label}
              disabled={isMatched}
              onClick={() => onPick(it.id)}
              className={`text-left rounded-2xl p-3 shadow border transition active:scale-95 ${
                isMatched
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : isSelected
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
