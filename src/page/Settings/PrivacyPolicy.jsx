import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navigate from "../../Navigate";
import { useAddManageMutation, useGetAboutQuery } from "../redux/api/manageApi";
import { Button, message } from "antd";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {data: aboutUsData} = useGetAboutQuery({page: "privacy"})
  const [isLoading, seLoading] = useState(false)
  const[addManage] = useAddManageMutation()

  const handleTerms = async () => {
    const data = {
      content: content,
      page: "privacy",
    };
   
    seLoading(true);
    const res = await addManage(data).unwrap();
    seLoading(false);
    console.log("res", res);
    message.success(res?.message);
  };


  console.log(aboutUsData)
  const navigate = useNavigate();
  // const handleTerms = () => {
  //     console.log(content)
  // }
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 600,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  useEffect(() => {
    setContent(aboutUsData?.content);
  }, [aboutUsData]);

  return (
    <div className=" mx-auto bg-white p-3">
      <div className="flex justify-between pb-4">
        <div className="flex justify-between ">
          <Navigate title={"Privacy Polacy"}></Navigate>
        </div>
      </div>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={newContent => { }}
      />

      <div className="mt-5 flex justify-center">
        <Button
            onClick={handleTerms}
            className="bg-black text-white px-4 py-2 rounded-full test"
            loading={isLoading}
          >
            Save Changes
          </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
