"use strict";

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
        this.currentDate = new Date();
    }

    render(date) {
        this.currentDate = new Date(date);
        const container = document.getElementById(this.id);
        container.innerHTML = ''; 
        const header = this.createHeader();
        const calendar = this.createCalendar();

        container.appendChild(header);
        container.appendChild(calendar);
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'date-picker-header';

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<';
        prevButton.onclick = () => this.changeMonth(-1);
        header.appendChild(prevButton);


        const monthYearText = document.createElement('span');
        monthYearText.innerHTML = `${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`;
        header.appendChild(monthYearText);

        const nextButton = document.createElement('button');
        nextButton.innerHTML = '>';
        nextButton.onclick = () => this.changeMonth(1);
        header.appendChild(nextButton);



        return header;
    }

    createCalendar() {
        const calendar = document.createElement('table');
        calendar.className = 'date-picker-calendar';

        const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT','TOHFA'];
        const headerRow = calendar.insertRow();
        daysOfWeek.forEach(day => {
            const cell = headerRow.insertCell();
            cell.innerHTML = day;
        });

        const monthStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const monthEnd = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() +1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        let currentDate = new Date(startDate);
        while (currentDate <= monthEnd || currentDate.getDay() !== 0) {
            const weekRow = calendar.insertRow();
            for (let i = 0; i < 8; i++) {
                const cell = weekRow.insertCell();
                cell.innerHTML = currentDate.getDate();
                cell.className = currentDate.getMonth() === this.currentDate.getMonth() ? 'current-month' : 'other-month';

                if (currentDate.getMonth() === this.currentDate.getMonth()) {
                    let selectedDate = new Date(currentDate);
                    cell.onclick = () => this.selectDate(selectedDate);
                    selectedDate.className = 'selectedDate';
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return calendar;
    }

    changeMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);
        this.render(this.currentDate);
    }

    selectDate(date) {
        if (date.getMonth() === this.currentDate.getMonth()) {
            const fixedDate = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            };
            this.callback(this.id, fixedDate);
        }
    }
}
