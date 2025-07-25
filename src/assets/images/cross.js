import * as React from "react";

function CrossSvg(props) {
  return (
    <svg
      width={13.206}
      height={13.206}
      viewBox="0 0 3.494 3.494"
      id="prefix__svg5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs id="prefix__defs2">
        <filter
          id="prefix__a"
          x={0}
          y={0}
          width={369}
          height={318}
          filterUnits="userSpaceOnUse"
        >
          <feOffset id="prefix__feOffset11" />
          <feGaussianBlur
            stdDeviation={0.5}
            result="b"
            id="prefix__feGaussianBlur13"
          />
          <feFlood floodOpacity={0.071} id="prefix__feFlood15" />
          <feComposite
            operator="in"
            in2="b"
            id="prefix__feComposite17"
            result="result1"
          />
          <feComposite
            in="SourceGraphic"
            in2="result1"
            id="prefix__feComposite19"
          />
        </filter>
        <style id="style9">{".prefix__c{fill:none;stroke:#707070}"}</style>
      </defs>
      <g id="prefix__layer1">
        <g transform="matrix(.26458 0 0 .26458 .094 .094)" id="prefix__g36">
          <path className="prefix__c" id="prefix__line32" d="M12.5 0L0 12.5" />
          <path className="prefix__c" id="prefix__line34" d="M0 0l12.5 12.5" />
        </g>
      </g>
    </svg>
  );
}

export default CrossSvg;
