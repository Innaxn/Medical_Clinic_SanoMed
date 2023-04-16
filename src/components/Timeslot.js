import React from 'react'
import Moment from 'moment';
import styles from '../pages/MakeAppointmentPage.module.css'

function Timeslot({ itemKey, slotsItem, handleStartTime, day }) {
  const currentTime = Moment();
  const startTime = Moment(slotsItem.startTime);

  const isPast = startTime.isBefore(currentTime);

  return (
    <div className="card d-flex flex-row p-2 mb-2" id={styles.best}>
      <input
        className="d-block form-check-input"
        type="radio"
        id={`timeslot${itemKey}${day}`}
        name="timeslot"
        value={slotsItem.startTime}
        onChange={handleStartTime}
        disabled={isPast}
      />
      <label className="form-check-label" htmlFor={`timeslot${itemKey}${day}`}>
        <p className={styles.tstext}>{Moment(slotsItem.startTime).format("D MMMM YYYY")}</p>
        <p className={styles.tstime}>From: {Moment(slotsItem.startTime).format('HH:mm')}  until: {Moment(slotsItem.endTime).format('HH:mm')}</p>
      </label>
    </div>
  )
}

export default Timeslot