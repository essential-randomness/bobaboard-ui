import useComponentSize from "@rehooks/component-size";
import React from "react";

function getBackgroundDivs(
  containerRect: DOMRect,
  textRects: DOMRectList,
  highlightColor: string
) {
  const rotateStart = -4;
  const rotateIncrement = 4;
  let rotateNext = rotateStart;
  return Object.keys(textRects).map((textRect, i) => {
    const rotation = rotateNext;
    const bias = textRects[textRect].width / textRects[textRect].height;
    rotateNext += rotateIncrement;
    if ((i + 1) % 3 == 0) {
      rotateNext = rotateStart;
    }
    const adjustement = (-rotation * bias) / 50;
    return (
      <div
        key={textRect}
        style={{
          backgroundColor: highlightColor,
          borderRadius: "20px",
          position: "absolute",
          top: textRects[textRect].top - containerRect.top + 7,
          left: textRects[textRect].left - containerRect.left - 15,
          width: textRects[textRect].width + 30,
          height: textRects[textRect].height - 10,
          transform: `rotate(${rotation + adjustement}deg)`,
        }}
      />
    );
  });
}

const HighlightedText: React.FC<HighlightedTextProps> = (props) => {
  const header = React.useRef<HTMLDivElement>();
  const background = React.useRef<HTMLDivElement>(null);
  const [backgroundDivs, setBackgroundDivs] = React.useState<React.ReactNode[]>(
    []
  );
  const { width } = useComponentSize(header);

  React.useEffect(() => {
    let throttled = false;
    let attempted = false;
    const addBackground = () => {
      if (throttled) {
        attempted = true;
        return;
      }
      if (!header.current || !background.current) {
        // TODO: figure out why this happens.
        console.log(`uh-oh, ${props.children}`);
        return;
      }
      const textRects = header.current.getClientRects();
      const containerRect = background.current.getClientRects()[0];
      setBackgroundDivs(
        getBackgroundDivs(containerRect, textRects, props.highlightColor)
      );
      throttled = true;
      setTimeout(() => {
        throttled = false;
        if (attempted) {
          attempted = false;
          addBackground();
        }
      }, 50);
    };
    // Chrome has some problems with rendering. Add delay.
    setTimeout(addBackground, 50);
    setTimeout(addBackground, 100);
    setTimeout(addBackground, 150);
  }, [props.highlightColor, width]);

  return (
    <div>
      <div className="header">
        <div className="backgroundDivs" ref={background}>
          {backgroundDivs}
        </div>
        {React.useMemo(
          () =>
            React.isValidElement(props.children) &&
            React.cloneElement(props.children, {
              style: {
                ...props.children.props.style,
                zIndex: 2,
                position: "relative",
              },
              ref: header,
            }),
          [props.children]
        )}
      </div>
      <style jsx>{`
        .header {
          position: relative;
          min-height: 0;
          min-width: 0;
        }
        .backgroundDivs {
          background-color: blue;
          position: relative;
          z-index: 1;
          min-height: 0;
          min-width: 0;
        }
      `}</style>
    </div>
  );
};

export default HighlightedText;

export interface HighlightedTextProps {
  highlightColor: string;
  children: React.ReactNode;
}
