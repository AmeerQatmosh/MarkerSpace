import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CollectionFormProps {
  onSubmit: (name: string, description?: string) => void;
  onCancel: () => void;
  defaultName?: string;
  defaultDesc?: string;
  title?: string;
}

const CollectionForm: FC<CollectionFormProps> = ({
  onSubmit,
  onCancel,
  defaultName = "",
  defaultDesc = "",
  title = "Create Collection",
}) => {
  const [name, setName] = useState(defaultName);
  const [desc, setDesc] = useState(defaultDesc);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Collection name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onSubmit(name, desc)}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionForm;
