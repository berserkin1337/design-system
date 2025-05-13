import { clsx } from "clsx";
import React, { type KeyboardEvent, useState } from "react";
import { Input, type InputProps } from "../Input"; // Assuming Input component path
import { Tag, type TagProps } from "../Tag"; // Assuming Tag component path
import {
  colonSeparator,
  displayedTagsArea,
  inputRow,
  keyInputWrapper,
  tagsInputWrapper,
  valueInputWrapper,
} from "./TagsInput.css";

interface TagItem {
  id: string; // For unique key
  keyText: string;
  valueText: string;
}

export interface TagsInputProps {
  initialTags?: TagItem[];
  onTagsChange?: (tags: TagItem[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  inputSize?: InputProps["size"]; // 'small' | 'regular' from Input component
  tagSize?: TagProps["size"]; // 'medium' | 'large' from Tag component
  maxTags?: number;
  disabled?: boolean;
  className?: string;
  // Add other props for styling or behavior as needed
}

export const TagsInput: React.FC<TagsInputProps> = ({
  initialTags = [],
  onTagsChange,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  inputSize = "regular",
  tagSize = "medium",
  maxTags,
  disabled = false,
  className,
}) => {
  const [currentKey, setCurrentKey] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [tags, setTags] = useState<TagItem[]>(initialTags);

  const addTag = () => {
    if (currentKey.trim() && currentValue.trim()) {
      if (maxTags && tags.length >= maxTags) {
        // Optional: handle max tags reached (e.g., show an error)
        console.warn(`Maximum tags (${maxTags}) reached.`);
        return;
      }
      const newTag: TagItem = {
        id: `${currentKey.trim()}-${currentValue.trim()}-${Date.now()}`, // Simple unique ID
        keyText: currentKey.trim(),
        valueText: currentValue.trim(),
      };
      const newTags = [...tags, newTag];
      setTags(newTags);
      onTagsChange?.(newTags);
      setCurrentKey("");
      setCurrentValue("");
    }
  };

  const removeTag = (idToRemove: string) => {
    const newTags = tags.filter((tag) => tag.id !== idToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleValueKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      addTag();
    }
  };

  const handleValueBlur = () => {
    // Add tag on blur only if key also has value
    if (currentKey.trim() && currentValue.trim()) {
      addTag();
    }
  };

  return (
    <div className={clsx(tagsInputWrapper, className)}>
      <div className={inputRow}>
        <div className={keyInputWrapper}>
          <Input
            // className={tagKeyInput} // Apply if specific styling is needed
            size={inputSize}
            placeholder={keyPlaceholder}
            value={currentKey}
            onChange={(e) => setCurrentKey(e.target.value)}
            disabled={disabled || (maxTags ? tags.length >= maxTags : false)}
            aria-label="Tag Key Input"
          />
        </div>
        <span className={colonSeparator}>:</span>
        <div className={valueInputWrapper}>
          <Input
            // className={tagValueInput}
            size={inputSize}
            placeholder={valuePlaceholder}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleValueKeyDown}
            onBlur={handleValueBlur} // Add tag on blur
            disabled={disabled || (maxTags ? tags.length >= maxTags : false)}
            aria-label="Tag Value Input"
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className={displayedTagsArea}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              size={tagSize}
              onRemove={disabled ? undefined : () => removeTag(tag.id)}
              // If Tag component needs disabled prop for styling remove X differently
              // disabled={disabled}
            >
              {tag.keyText} : {tag.valueText}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};

TagsInput.displayName = "TagsInput";
