import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type ListProps = {
  items: string[];
  onchange: (newItems: string[]) => void;
  className?: string;
  isEditable?: boolean;
};

type ListItemProps = {
  item: string;
  index: number;
  onchange: (index: number, value: string) => void;
  onkeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  isEditable?: boolean;
  fontColor?: string;
};

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  onchange,
  onkeyDown,
  isEditable = true,
  fontColor,
}) => (
  <input
    type="text"
    value={item}
    onChange={(e) => onchange(index, e.target.value)}
    onKeyDown={(e) => onkeyDown(e, index)}
    className=" bg-transparent outline-none w-full py-1"
    style={{ color: fontColor }}
    readOnly={!isEditable}
  ></input>
);

const ListComponents: React.FC<ListProps> = ({
  items,
  onchange,
  className,
  isEditable = true,
}: ListProps) => {
  const { currentTheme } = useSlideStore();

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onchange(newItems);
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onchange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onchange(newItems);
    }
  };
  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            onchange={handleChange}
            onkeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          ></ListItem>
        </li>
      ))}
    </ol>
  );
};

export default ListComponents;

export const BulletList: React.FC<ListProps> = ({
  items,
  onchange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();
  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onchange(newItems);
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onchange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onchange(newItems);
    }
  };

  return (
    <ul
      className={cn("list-disc pl-5 space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className=" pl-1 marker:text-current">
          <ListItem
            item={item}
            index={index}
            onchange={handleChange}
            onkeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          ></ListItem>
        </li>
      ))}
    </ul>
  );
};

export const TodoList: React.FC<TodoListProps> = ({
  items,
  onchange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const toggleCheckbox = (index: number) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = newItems[index].startWith("[x] ")
        ? newItems[index].replace("[x] ", "[ ] ")
        : newItems[index].replace("[ ] ", "[x] ");
      onchange(newItems);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] =
        value.startsWith("[ ] ") || value.startsWith("[x] ")
          ? value
          : `[ ] ${value}`;
      onchange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "[ ] ");
      onchange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "[ ] " &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onchange(newItems);
    }
  };
  return (
    <ul
      className={cn("space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.startWith("[x]")}
            onChange={() => toggleCheckbox(index)}
            className=" form-checkbox"
            disabled={!isEditable}
          ></input>
          <ListItem
            item={item.replace(/^\[[ x]\] /, "")}
            index={index}
            onchange={(index, value) =>
              handleChange(
                index,
                `${item.startWith("[x] ") ? "[x] " : "[ ] "}${value}`
              )
            }
            onkeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          ></ListItem>
        </li>
      ))}
    </ul>
  );
};
