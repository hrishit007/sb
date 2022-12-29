import "./css/panel.css";
import Tooltip from '@mui/material/Tooltip';

export default function Panel()
{
    return (
        <div className="left-panel">
                    <ul>
                        <li><Tooltip placement="top" title="select grids"><a href="/"><img src="/images/panelicon1.png" /></a></Tooltip></li>
                        <li><Tooltip placement="top" title="upload to cart"><a href="/"><img src="/images/panelicon2.png" /></a></Tooltip></li>
                        <li><Tooltip placement="top" title="delete grids"><a href="/"><img src="/images/panelicon3.png" /></a></Tooltip></li>
                        <li><Tooltip placement="top" title="download grid data"><a href="/"><img src="/images/panelicon4.png" /></a></Tooltip></li>
                    </ul>
                </div>
    );

}
