import React from 'react';
import './example.scss';
import { Table } from '@themesberg/react-bootstrap';

const treeData = [
    {
      key: "0",
      label: "Category",
      icon: "fa fa-folder",
      name: "Documents Folder",
      author: 'Admin',
      size: 12,
      updateDate: '2021-02-01',
      children: [
        {
          key: "0-0",
          label: "Category 1-1",
          icon: "fa fa-folder",
          name: "Documents Folder",
          author: 'Admin',
          size: 12,
          updateDate: '2021-02-01',
          children: [
            {
              key: "0-1-1",
              label: "Document-0-1.doc",
              icon: "fa fa-file",
              name: "Documents Folder",
              author: 'Admin',
              size: 102,
              updateDate: '2021-02-01',
            },
            {
              key: "0-1-2",
              label: "Document-0-2.doc",
              icon: "fa fa-file",
              name: "Documents Folder",
              author: 'Admin',
              size: 162,
              updateDate: '2021-02-01',
            },
            {
              key: "0-1-3",
              label: "Document-0-3.doc",
              icon: "fa fa-file",
              name: "Documents Folder",
              author: 'Admin',
              size: 132,
              updateDate: '2021-02-11',
            },
            {
              key: "0-1-4",
              label: "Document-0-4.doc",
              icon: "fa fa-file",
              name: "Documents Folder",
              author: 'Admin',
              size: 121,
              updateDate: '2021-12-01',
            },
          ],
        },
        {
            key: "0-1-0",
            label: "document0-1-0.doc",
            icon: "fa fa-file",
            name: "Documents Folder",
            author: 'Admin',
            size: 222,
            updateDate: '2021-03-01',
        },
        {
            key: "0-1-1",
            label: "document0-1-1.doc",
            icon: "fa fa-file",
            name: "Documents Folder",
            author: 'Admin',
            size: 1512,
            updateDate: '2021-02-11',
        },
      ],
    },
    {
      key: "1",
      label: "Category 2",
      icon: "fa fa-folder",
      name: "Desktop Folder",
      author: 'Admin',
      size: 12,
      updateDate: '2021-02-01',
      children: [
        {
          key: "1-0",
          label: "document1.doc",
          icon: "fa fa-file",
          name: "Documents Folder",
          author: 'Admin',
          size: 12,
          updateDate: '2021-02-01',
        },
        {
          key: "0-0",
          label: "documennt-2.doc",
          icon: "fa fa-file",
          name: "Documents Folder",
          author: 'Admin',
          size: 12,
          updateDate: '2021-02-01',
        },
      ],
    },
    {
      key: "2",
      label: "Category 3",
      icon: "fa fa-folder",
      name: "Downloads Folder",
      author: 'Admin',
      size: 12,
      updateDate: '2021-02-01',
      children: [],
    },
  ];
  

const Tree = ({ data = [], getNodeData }) => {
    return (
      <div className="d-tree">
        <ul className="d-flex d-tree-container flex-column">
          {data.map((tree, i) => {
              if(tree.children) {
                  return (
                    <div key={tree.key}>
                        <TreeNode node={tree} getNodeData={getNodeData} />
                    </div>
                  )
              }
          })}
        </ul>
      </div>
    );
};
  
  const TreeNode = ({ node, getNodeData }) => {
    const [childVisible, setChildVisibility] = React.useState(false);
  
    const hasChild = node.children ? true : false;

    const nodeData = (nodeData) => e => {
        getNodeData(nodeData)();
        setChildVisibility((v) => !v)
    }
  
    return (
      <li className="d-tree-node border-0">
        <div className="d-flex" onClick={nodeData(node)}>
          {hasChild && (
            <div
              className={`d-inline d-tree-toggler ${
                childVisible ? "active" : ""
              }`}
            >
              {/* <FontAwesomeIcon icon="caret-right" /> */}
            </div>
          )}
  
          <div className={`col d-tree-head`}>
            <i className={`mr-1 ${node.icon}`}> </i>
            {node.label}
          </div>
        </div>
  
        {hasChild && childVisible && (
          <div className="d-tree-content">
            <ul className="d-flex d-tree-container flex-column">
              <Tree data={node.children} getNodeData={getNodeData} />
            </ul>
          </div>
        )}
      </li>
    );
  };

const Example = () => {
    const [nodeData, setNodeData] = React.useState([]);
    const [previewFile, setPreviewFile] = React.useState();

    const getNodeData = (data) => e => {
        setNodeData(data);
    }

    const getPreviewFile = (file) => e => {
        setPreviewFile(file)
    }

    const renderTableContent = () => {
        const content = (v, i) => {
            return (
                <tr key={i} onClick={v.children ? getNodeData(v) : getPreviewFile(v)}>
                    <td className='border-0' ><i className={`mr-1 ${v.icon}`}> </i></td>
                    <td className="border-0">{v.label}</td>
                    <td className="border-0">{v.size}</td>
                    <td className='border-0'> {v.updateDate} </td>
                    <td className='border-0'> {v.author} </td>
                </tr>
            )
        }

        let renderData = '';

        if (!nodeData) return renderData;

        if (nodeData.children) {
            renderData = nodeData.children.map((v, i) => content(v, i));
            return renderData;
        }

        renderData = content(nodeData, 0);

        return renderData;
    }

    return (
        <div id='wrapper'>
            <div id='tree-document'>
                    <div className="col text-center">
                        <div className="text-left text-dark">
                            <Tree data={treeData} getNodeData={getNodeData} />
                        </div>
                    </div>
            </div>

            <div id='wrapper-document-data'>
                <div id='document-data'>
                <Table>
                    <thead className="thead-light">
                        <tr>
                            <th className="border-0"></th>
                            <th className="border-0">Name</th>
                            <th className="border-0">Size</th>
                            <th className="border-0">Update date</th>
                            <th className="border-0">Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {nodeData.children && nodeData.children.map((v, i) => {
                            return (
                                <tr key={i} onClick={getNodeData(v)}>
                                    <td className='border-0' ><i className={`mr-1 ${v.icon}`}> </i></td>
                                    <td className="border-0">{v.label}</td>
                                    <td className="border-0">{v.size}</td>
                                    <td className='border-0'> {v.updateDate} </td>
                                    <td className='border-0'> {v.author} </td>
                                </tr>
                            )
                        })} */}

                        {renderTableContent()}
                    </tbody>
                </Table>
                </div>

                <div id='preview-file'>
                    <p>File name: {previewFile?.name}</p>
                    <p>Label: { previewFile?.label }</p>
                </div>
            </div>
        </div>
    )
}

export default Example;