const data = [
    {
        date: "2023-12-10",
        events: [
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
        ],
    },
    {
        date: "2023-12-16",
        events: [
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
        ],
    },
    {
        date: "2023-12-30",
        events: [
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
        ],
    },
    {
        date: "2024-1-30",
        events: [
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
            { startTime: 900, endTime: 1230, text: "9:00am to 12:30pm" },
        ],
    }
];

console.log("calenderHello");
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();

console.log(today);
console.log(today.getUTCMonth());
let months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const loadCalendar = (month: number, year: number) => {
    let firstDay = (new Date(year, month)).getDay();

    const tbl = document.querySelector('#calendar-body') as HTMLTableElement;
    // clearing all previous cells
    tbl.innerHTML = "";

    const monthAndYear = document.querySelector('#monthAndYear') as HTMLHeadElement;
    monthAndYear.innerHTML = months[month] +" "+ year;

    let date: number = 1;
    for (let i = 0; i < 6; i++) {
        const row: HTMLTableRowElement = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell: HTMLTableCellElement = document.createElement("td");
                let cellText: Text = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }else if (date > daysInMonth(month, year)) {
                break;
            }
            else {
                let cell: HTMLTableCellElement = document.createElement("td");
                let cellDate: Text = document.createTextNode(date.toString());
                cell.appendChild(cellDate);
                let brD: HTMLBRElement = document.createElement("br");
                cell.appendChild(brD);

                let thisDate = year+"-"+(month+1)+"-"+date;
                //let events: string[] = ["Event 1","Event 2"];
                const eventsForDate = getEventsForDate(thisDate);
                if (eventsForDate) {
                    eventsForDate.forEach((event) => {
                        let note: Text = document.createTextNode(event.text);
                        cell.appendChild(note);
                        let brE: HTMLBRElement = document.createElement("br");
                        cell.appendChild(brE);
                    });
                }
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

// check how many days in a month
const daysInMonth = (iMonth: number, iYear: number) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

//next month
function nextCal(): void {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    loadCalendar(currentMonth, currentYear);
}
document.getElementById("next")?.addEventListener("click", nextCal);
//previous month
function previousCal(): void {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    loadCalendar(currentMonth, currentYear);
}
document.getElementById("previous")?.addEventListener("click", previousCal);

//get the event for given date.
function getEventsForDate(date: string): any[] | undefined {
    const foundDate = data.find((entry) => entry.date === date);
    return foundDate ? foundDate.events : undefined;
}
//load calender
loadCalendar(currentMonth, currentYear);