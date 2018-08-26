/* eslint-disable import/prefer-default-export */
import { sprintf } from 'sprintf-js'

export function durationToHuman(ms) {
  //const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  return sprintf('%02d:%02d', hours, minutes)
}

export function setLogDate(date, dateStr) {
	const hlp = dateStr.split('-')
	if (dateStr !== '') {
		date.setDate(hlp[2])
		date.setMonth(hlp[1] - 1)
		date.setYear(hlp[0])
	}
	return date
}

export function setLogTime(date, timeStr) {
	const hlp = timeStr.split(':')
	date.setHours(hlp[0])
	date.setMinutes(hlp[1])
	date.setSeconds(0)
	date.setMilliseconds(0)
	return date
}

export function getLogTimeStr(timeStamp) {
	const date = new Date(timeStamp)
	return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}

export function getLogDateStr(timeStamp) {
  const date = new Date(timeStamp)
  /*
	const dateStr = sprintf('%02d.%02d.%4d',
		date.getDate(),
		date.getMonth() + 1,
		date.getFullYear()
	)
  return dateStr
  */
	return date.toLocaleDateString([], {day: '2-digit', month:'2-digit', year: 'numeric'})
}

export function getLogIsoDateStr(date) {
	const isoDateStr = sprintf('%4d-%02d-%02d',
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	)
	return isoDateStr
}

export function getLogTotalTimeStr(timeStart, timeEnd) {
	if (timeEnd > timeStart) {
		return durationToHuman(timeEnd - timeStart)
	} else {
		return '00:00'
	}
}
