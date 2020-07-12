import React from "react";
import { Progress } from "semantic-ui-react";

export default function WarrantyListItem(props) {
  const {
    item_id,
    item_name,
    item_category,
    duration_in_months,
    start_date,
  } = props.warranty;
  // refactor
  let day1 = new Date(parseInt(start_date, 10));
  let day2 = new Date(Date.now());
  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  // console.log(monthDiff(day1, day2));
  // console.log(day2);
  let passedMonths = monthDiff(day1, day2);
  let status = [false, false, false, false];
  if (passedMonths / duration_in_months >= 1) {
    status[3] = true;
    passedMonths = duration_in_months;
  } else if (passedMonths / duration_in_months > 0.75) {
    status[0] = true;
  } else if (passedMonths / duration_in_months > 0.25) {
    status[1] = true;
  } else {
    status[2] = true;
  }
  let icon;
  switch (item_category) {
    case "Personal and Household":
      // code block
      icon = "fa fa-home";
      break;
    case "Transportation":
      // code block
      icon = "fa fa-bus";
      break;
    case "Grocery and Retail":
      // code block
      icon = "fa fa-shopping-cart";
      break;

    case "Entertainment":
      // code block
      icon = "fa fa-gamepad";
      break;

    case "Restaurants":
      // code block
      icon = "fa fa-cutlery";
      break;

    case "Health and Education":
      // code block
      icon = "fa fa-hospital-o";
      break;

    case "Sports Equipment":
      // code block
      icon = "fa fa-bicycle";
      break;

    case "Mobile":
      // code block
      icon = "fa fa-mobile";
      break;
    case "Appliance":
      // code block
      icon = "fa fa-plug";
      break;
    case "Electronics":
      // code block
      icon = "fa fa-laptop";
      break;

    case "Camera":
      // code block
      icon = "fa fa-camera";
      break;

    case "Musical Instruments":
      // code block
      icon = "fa fa-music";
      break;

    case "Audio":
      // code block
      icon = "fa fa-headphones";
      break;

    default:
      // code block
      icon = "fa fa-user-o";
  }
  return (
    <tr>
      <td>
        <i className={icon} aria-hidden="true"></i>
      </td>
      <td>{item_name}</td>
      <td style={{ width: "600px" }}>
        {" "}
        <Progress
          value={passedMonths}
          total={duration_in_months}
          progress="ratio"
          error={status[0]}
          warning={status[1]}
          success={status[2]}
          disabled={status[3]}
        />
      </td>
      <td>
        <button onClick={(e) => props.fetchItemDetails(item_id, false)}>
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
}
