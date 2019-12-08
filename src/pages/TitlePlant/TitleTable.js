import * as React from "react"
import { Table } from "../../components/Table"
import { useLocation } from "wouter"
import { Box } from "../../components/Box"
import { Button } from "../../components/Button"
import { Plus } from "react-feather"
import { useGlobalStore } from "../../global.store"
import Popup from "reactjs-popup"
import styled from "styled-components"
import { TextInput } from "../../components/TextInput"
import { Spacer } from "../../components/Spacer"
import { Grid, Cell } from "styled-css-grid"
import truncate from "truncate"

// Use props.columnOverrides to use default columns
// with unique properties.

// Use props.columns to provide completely custom
// column selection / properties.

const useMergedColuns = (props, columns) => {
  const ref = React.useRef(columns)

  if (props.columnOverrides) {
    ref.current = columns.reduce((column, final) => {
      const override = props.columnOverrides[column.Header]

      if (override) {
        return [
          ...final,
          {
            ...column,
            ...override,
          },
        ]
      }

      return final
    }, [])
  }

  return ref.current
}

export const TitleTable = (props) => {
  const globalStore = useGlobalStore()
  const [location, setLocation] = useLocation()

  const columns = useMergedColuns(props, [
    {
      Header: "ID",
      accessor: "TitleID",
      width: 80,
      maxWidth: 200,
      collapse: true,
      onClick: (cell) => {
        globalStore.setCurrentTitleID(cell.value)
      },
    },
    {
      Header: "Status",
      accessor: "status",
      width: 120,
      maxWidth: 200,
      collapse: true,
    },
    {
      Header: "Grantor",
      accessor: "Grantor",
      width: 230,
      maxWidth: 300,
      collapse: true,
      Cell: ({ cell: { value } }) => truncate(value, 23),
    },
    {
      Header: "Grantee",
      accessor: "Grantee",
      width: 150,
      maxWidth: 200,
      collapse: true,
    },
    {
      Header: "Recorded Date",
      accessor: "RecordedDate",
      width: 200,
      maxWidth: 250,
      collapse: true,
    },
    {
      Header: "Effective Date",
      accessor: "EffectiveDate",
      width: 200,
      maxWidth: 250,
      collapse: true,
    },
    {
      Header: "Document Type",
      accessor: "DocumentType",
      width: 200,
      maxWidth: 250,
      collapse: true,
    },
  ])

  return (
    <Table
      isLoading={props.isLoading}
      height={props.data.length * 45}
      title="Titles"
      columns={columns || []}
      data={props.data}
      renderTopRow={(props, tableState) => (
        <Box inline width="100%" justifyContent="flex-end" alignItems="center">
          <Popup
            trigger={
              <Button small>
                <Plus size="18px" style={{ marginRight: 6 }} />
                Add Title
              </Button>
            }
            modal
            closeOnDocumentClick
          >
            {(close) => <AddTitleModal close={close} />}
          </Popup>
        </Box>
      )}
    />
  )
}

const STATE_LABEL_MAP = {
  TitleID: { label: "Title ID", width: 1 },
  EmployeeID: { label: "Employee ID", width: 1 },
  RecordedDate: { label: "Recorded Date", width: 1 },
  CertificationDate: { label: "Certification Date", width: 1 },
  EffectiveDate: { label: "Effective Date", width: 1 },
  DocumentType: { label: "Document Type", width: 1 },
  DocumentName: { label: "Document Name", width: 1 },
  BookVolume: { label: "Book Volume", width: 1 },
  Page: { label: "Page", width: 1 },
  Acreage: { label: "Acreage", width: 1 },
  Grantor: { label: "Grantor", width: 2 },
  Grantee: { label: "Grantee", width: 2 },
  Conveyance: { label: "Conveyance", width: 2 },
  CreatedDate: { label: "Created Date", width: 2 },
  Mapped: { label: "Mapped", width: 2 },
  CreatedBy: { label: "Created By", width: 2 },
}

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  min-width: 900px;
  height: 100%;
  min-height: 700px;
  max-height: 800px;
  border-radius: 6px;
  padding: 48px;
  background: var(--grayscale0);
  overflow-y: scroll;
`

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px;
`

const AddTitleModal = (props) => {
  const [state, setState] = React.useState({
    TitleID: "",
    EmployeeID: "",
    RecordedDate: "",
    CertificationDate: "",
    DocumentType: "",
    DocumentName: "",
    EffectiveDate: "",
    BookVolume: "",
    Page: "",
    Acreage: "",
    Grantor: "",
    Grantee: "",
    Conveyance: "",
    CreatedDate: "",
    CreatedBy: "",
    Mapped: "",
  })

  const onChange = (key) => (event) => {
    const { value } = event.target
    setState((state) => ({
      ...state,
      [key]: value,
    }))
  }

  return (
    <StyledModal>
      <h2>Add Title</h2>
      <StyledForm>
        <Grid columns={2} gap="24px" style={{ width: "100%" }}>
          {Object.entries(state).map(([key, value]) => (
            <Cell width={STATE_LABEL_MAP[key].width}>
              <TextInput
                width="100%"
                label={STATE_LABEL_MAP[key].label}
                value={value}
                onChange={onChange(key)}
              />
            </Cell>
          ))}
        </Grid>
      </StyledForm>
      <StyledActionsRow>
        <Button.Ghost onClick={props.close}>Cancel</Button.Ghost>
        <Spacer size="24px" />
        <Button onClick={props.close}>Submit</Button>
      </StyledActionsRow>
    </StyledModal>
  )
}

const StyledActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
