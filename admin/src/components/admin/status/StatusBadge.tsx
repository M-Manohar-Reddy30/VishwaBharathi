import { Badge } from "@/components/ui";

type Status =
  | "ACTIVE"
  | "INACTIVE"
  | "PUBLISHED"
  | "DRAFT"
  | "ARCHIVED"
  | "DELETED";

interface Props {
  status: Status;
}

export default function StatusBadge({
  status,
}: Props) {
  switch (status) {
    case "ACTIVE":
    case "PUBLISHED":
      return (
        <Badge variant="success">
          {status}
        </Badge>
      );

    case "DRAFT":
      return (
        <Badge variant="warning">
          {status}
        </Badge>
      );

    case "ARCHIVED":
      return (
        <Badge variant="info">
          {status}
        </Badge>
      );

    case "DELETED":
    case "INACTIVE":
      return (
        <Badge variant="danger">
          {status}
        </Badge>
      );

    default:
      return (
        <Badge>
          {status}
        </Badge>
      );
  }
}