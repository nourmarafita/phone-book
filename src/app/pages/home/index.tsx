import React, {
  // ChangeEvent,
  // forwardRef,
  useCallback,
  useEffect,
  useMemo,
  // useRef,
  // useState,
} from "react";
// import Table from "./components/Table";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../../gql/queries";
// import { request } from "@gilbarbara/helpers";
import { DataTable } from "../../../components";
import {
  DataTableColumn,
  DataTableProps,
  DataTableRow,
} from "../../../components";
import { useSetState } from "react-use";
import {
  // Anchor,
  Box,
  // Button,
  ButtonUnstyled,
  // ComponentWrapper,
  // Dialog,
  // Dropdown,
  H1,
  Icon,
  // Input,
  // NonIdealState,
  // Spacer,
  // Tag,
  // Text,
} from "../../../components";
// import { users } from "./components/fixtures";
// import { DropdownOption, VariantWithTones } from "../../../types";
import { StringOrNull } from "@gilbarbara/types";
import { parseISO, format } from 'date-fns';

// interface Package {
//   author: {
//     email: string;
//     name: string;
//     username: string;
//   };
//   date: string;
//   description: string;
//   keywords: string[];
//   links: {
//     bugs: string;
//     homepage: string;
//     npm: string;
//     repository: string;
//   };
//   maintainers: Array<{
//     email: string;
//     username: string;
//   }>;
//   name: string;
//   publisher: Array<{
//     email: string;
//     username: string;
//   }>;
//   scope: string;
//   version: string;
// }
interface Contacts {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: Array<{
    number: number;
  }>;
}

// interface Entry {
//   contacts: Contacts;
//   score: {
//     detail: {
//       maintenance: number;
//       popularity: number;
//       quality: number;
//     };
//     final: number;
//   };
//   searchScore: number;
// }

// interface Response {
//   objects: Entry[];
//   time: string;
//   total: number;
// }

interface ExternalState {
  currentPage: number;
  loading: boolean;
  results: Array<Contacts>;
  selected: StringOrNull;
  showModal: boolean;
  totalPages: number;
}

// type ExternalColumns = "name" | "description" | "keywords" | "version";
type ExternalColumns = "first_name" | "last_name" | "created_at" | "phones" | "action";
// | "links";

const externalState: ExternalState = {
  currentPage: 1,
  loading: false,
  results: [],
  selected: null,
  showModal: false,
  totalPages: 0,
};

// const apiURL =
//   "https://registry.npmjs.org/-/v1/search?text=author:gilbarbara&size=10";

function ListContact(props: DataTableProps) {
  const { loading, error, data } = useQuery<{ contact: Contacts[] }>(
    GET_CONTACT_LIST
  );
  console.log(loading, error, data, `==== loading, error, data`);
  console.log(data?.contact?.length, `==== data?.contact?.length`);
  // const { accent, defaultSortColumn, maxRows = 10 } = props;
  const { defaultSortColumn = 10 } = props;
  // const [{ currentPage, loading, results, totalPages }, setState] =
  //   useSetState(externalState);
  const [{ currentPage, results, totalPages }, setState] =
    useSetState(externalState);

  const getPeople = useCallback(async () => {
    // setState({ loading: true });
    // const packages = await request<Response>(url, {
    //   headers: {
    //     "Content-Type": "text/plain",
    //   },
    // });

    if (loading === false) {
      setState({
        totalPages: data?.contact?.length,
        loading: loading,
        results: data?.contact?.map((d) => d),
      });
    }
  }, [data?.contact, loading, setState]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  // const handleClickPage = async (page: number) => {
  //   setState({ currentPage: page });
  //   await getPeople(`${apiURL}&from=${(page - 1) * maxRows}`);
  // };

  const columns = useMemo(() => {
    const items: DataTableColumn<ExternalColumns>[] = [
      { key: "first_name", title: "First Name", min: 150 },
      { key: "last_name", title: "Last Name", min: 150 },
      { key: "created_at", title: "Created At", min: 100, disableSort: true },
      { key: "phones", disableSort: true, min: 140, title: "Phones" },
      {
        key: "action",
        disableSort: true,
        size: 48,
        title: "Action",
      },
    ];

    return items;
  }, []);

  const data1 = useMemo(
    () =>
      results.map((package_) => {
        const row: DataTableRow<ExternalColumns> = {
          id: package_.id,
          first_name: package_.first_name,
          last_name: package_.last_name,
          created_at: format(parseISO(package_.created_at), 'yyyy-MM-dd'),
          phones: package_.phones[0].number,
          action: (
            <ButtonUnstyled
              data-code={package_.first_name}
              data-id={package_.id}
              // onClick={handleClickDelete}
            >
              <Icon name="trash" />
            </ButtonUnstyled>
          ),
          // keywords: package_.keywords ? package_.keywords.join(", ") : "--",
          // version: {
          //   label: <Tag bg={accent}>{package_.version}</Tag>,
          //   value: package_.version,
          // },
          // links: (
          //   <>
          //     <Anchor
          //       color={accent}
          //       href={package_.links.homepage}
          //       target="_blank"
          //     >
          //       Homepage
          //     </Anchor>
          //     <Anchor color={accent} href={package_.links.npm} target="_blank">
          //       NPM
          //     </Anchor>
          //   </>
          // ),
        };

        return row;
      }),
    [results]
  );
  return (
    <div>
      <Box width="100%" padding="xl" margin="xl">
        <H1>Contact List</H1>
        <DataTable<ExternalColumns>
          {...props}
          columns={columns}
          data={data1}
          defaultSortColumn={defaultSortColumn as ExternalColumns | undefined}
          disableScroll
          loading={loading}
          // onClickPage={handleClickPage}
          remote={{
            currentPage,
            totalPages,
            useInternalSorting: true,
          }}
        />
      </Box>
    </div>
  );
}

export default ListContact;
