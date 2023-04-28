import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { RHFUploadMultiFile } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import LabelStyle from "../LabelStyle";

const MultiFileUpload = ({ name = "image", maxSize = 200000 }) => {
  const { translate } = useLocales();
  const { setValue, watch } = useFormContext();

  const image = watch(name);
  const handleRemoveAll = () => {
    setValue(name, []);
  };

  const handleRemove = (file) => {
    const filteredItems = image?.filter((_file) => _file !== file);
    setValue(name, filteredItems);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const objectUrls = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue(name, [...image, ...objectUrls]);
    },
    [setValue, image]
  );
  return (
    <div>
      <LabelStyle>{translate("adminCommunication.blog.images")}</LabelStyle>
      <RHFUploadMultiFile
        name={name}
        showPreview
        accept="image/*"
        maxSize={maxSize}
        onDrop={handleDrop}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
      />
    </div>
  );
};

export default MultiFileUpload;
