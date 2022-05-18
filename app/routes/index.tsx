import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { add } from "~/rust.server";
import { napiAdd } from "~/rust.server";
import indexStylesUrl from "~/styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: indexStylesUrl }];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { left_operand, operator, right_operand } =
    Object.fromEntries(formData);
  console.log(Object.fromEntries(formData));
  let result = 0;
  switch (operator) {
    case "+":
      if (formData.get("wasm")){
        console.log("Using WASM")
        result = add(Number(left_operand), Number(right_operand));
      }
      else if (formData.get("napi")){
        console.log("Using NAPI")
        result = napiAdd(Number(left_operand), Number(right_operand));
      }
      console.log("result", result);
      return json({
        result,
      });
    default:
      // Implement other operators
      return json({
        result: "🤷🏾",
      });
  }
};

export default function Index() {
  const data = useActionData();

  return (
    <Form className="form-container" method="post" replace>
      <div className="grid-container">
        <input
          className="operand"
          type="number"
          name="left_operand"
          id="left_operand"
          placeholder="2"
        />
        <select className="operator" name="operator" id="operator">
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          className="operand"
          type="number"
          name="right_operand"
          id="right_operand"
          placeholder="2"
        />
        <button className="submit" name="wasm" value="wasm" type="submit">
          = with WASM
        </button>
        <button className="submit" name="napi" value ="napi" type="submit">
          = with N-API
        </button>
        <div className="result">{data?.result ? data?.result : ""}</div>
      </div>
    </Form>
  );
}
