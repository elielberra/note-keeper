import type { SVGProps } from "react";

export default function UnarchivedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={props.height || "100%"}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="m20 3 2 4v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.004L4 3zm0 6H4v10h16zm-8 1 4 4h-3v4h-2v-4H8zm6.764-5H5.236l-.999 2h15.527z" />
    </svg>
  );
}
