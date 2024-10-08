import type { SVGProps } from "react";

export default function NoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      fill="#161F3C"
      viewBox="0 0 36 36"
      height={props.height || "100%"}
      {...props}
    >
      <path
        d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
        className="note-icon_svg__clr-i-outline note-icon_svg__clr-i-outline-path-1"
      />
      <path
        d="m33.53 5.84-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.7 1.7 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16 31.84 7Z"
        className="note-icon_svg__clr-i-outline note-icon_svg__clr-i-outline-path-2"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
}
