import React from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { DriverProps } from '../types/index'; // Adaptez le chemin d'import

interface DriverCalendarProps {
  driver: DriverProps;
  calendarProps?: Partial<CalendarProps>;
}

const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const useDriverMarkedDates = (driver: DriverProps) => {
  const currentDate = formatDateToYYYYMMDD(new Date());
  const markedDates: { [date: string]: any } = {};

  // Marquer la date actuelle
  markedDates[currentDate] = {
    selected: true,
    selectedColor: '#3b82f6', // blue-500
    dotColor: 'white',
    textColor: 'white'
  };

  // Jours de repos
  driver.scheduling?.days_off?.forEach(dayOff => {
    try {
      const start = new Date(dayOff.start);
      const end = new Date(dayOff.end);
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDateToYYYYMMDD(d);
        markedDates[dateStr] = {
          ...markedDates[dateStr],
          selected: true,
          selectedColor: '#ef4444', // red-500
          disabled: true,
          dotColor: 'white'
        };
      }
    } catch (error) {
      console.error('Error processing days_off:', error);
    }
  });

  // Trajets programmés
  driver.scheduling?.scheduled_ranges?.forEach(range => {
    try {
      const start = new Date(range.start);
      const end = new Date(range.end);
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDateToYYYYMMDD(d);
        markedDates[dateStr] = {
          ...markedDates[dateStr],
          selected: true,
          selectedColor: '#10b981', // green-500
          dotColor: 'white'
        };
      }
    } catch (error) {
      console.error('Error processing scheduled_ranges:', error);
    }
  });

  // Désactiver les dates passées
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  markedDates[formatDateToYYYYMMDD(yesterday)] = {
    disabled: true,
    disableTouchEvent: true
  };

  return markedDates;
};

export const DriverCalendar: React.FC<DriverCalendarProps> = ({ 
  driver, 
  calendarProps = {} 
}) => {
  const markedDates = useDriverMarkedDates(driver);

  const defaultCalendarProps: CalendarProps = {
    markedDates,
    markingType: 'multi-dot',
    theme: {
      calendarBackground: '#ffffff',
      textSectionTitleColor: '#64748b',
      selectedDayBackgroundColor: '#3b82f6',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#3b82f6',
      dayTextColor: '#1e293b',
      textDisabledColor: '#d1d5db',
      dotColor: '#ffffff',
      selectedDotColor: '#ffffff',
      arrowColor: '#3b82f6',
      monthTextColor: '#1e293b',
      ...calendarProps?.theme
    },
    ...calendarProps
  };

  return <Calendar {...defaultCalendarProps} />;
};


export default DriverCalendar;