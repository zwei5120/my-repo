import { useState } from "react";
import { Input, Button, List } from "@mantine/core";

const TodoList = () => {
  console.log('TodoList')
  const [list, setList] = useState<
    {
      title: string;
      id: number | string;
    }[]
  >([
    {
      id: 1,
      title: "生活",
    },
    {
      id: 2,
      title: "学习",
    },
    {
      id: 3,
      title: "工作",
    },
    {
      id: 4,
      title: "打球",
    },
    {
      id: 5,
      title: "测试部署111",
    },
  ]);
  return (
    <div className="w-full h-full p-[20px]">
      <div className="w-full flex">
        <Input className="w-[100px] h-[40px]"></Input>
        <Button variant="light" radius="lg" className="mx-[10px]" size="sm">
          新增
        </Button>
        <Button
          variant="light"
          radius="lg"
          className="mx-[10px]"
          size="sm"
          onClick={() => {
            setList([]);
          }}
        >
          清空
        </Button>
      </div>
      <div>
        <List>
          {list?.map((el) => (
            <div key={el?.id}>{el?.title}</div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default TodoList;
