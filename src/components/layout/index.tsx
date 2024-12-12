import { ThemedLayoutV2, ThemedTitleV2, ThemedSiderV2 } from "@refinedev/antd"
import Header from "./header"
//import { Children } from "react"
//import Title from "antd/es/skeleton/Title"
import Icon from "@ant-design/icons/lib/components/AntdIcon";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
        Title= {(titleProps) => (
          <ThemedTitleV2 
            {...titleProps} 
            text="Đồ án tốt nghiệp siêu cấp vipro"
            //-icon={<Ico/>}
            />
          )}
        Header={Header}
    >
        {children}
    </ThemedLayoutV2>
  )
}

export default Layout