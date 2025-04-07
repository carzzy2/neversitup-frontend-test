import React from 'react';
import {API_CONFIG, setApiMode} from '@/config/apiConfig';
const ApiModeToggle = () => {
    const [apiMode, setApiModeState] = React.useState<'mock' | 'real'>(API_CONFIG.MODE);
    const handleToggleChange = () => {
        const newMode = apiMode === 'mock' ? 'real' : 'mock';
        setApiMode(newMode);
        setApiModeState(newMode);
    };
    return (
        <div className="api-mode-toggle d-flex flex-column align-items-center">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="apiModeToggle"
                    checked={apiMode === 'real'}
                    onChange={handleToggleChange}
                />
                <label className="form-check-label ms-2" htmlFor="apiModeToggle">
                    {apiMode === 'mock' ? 'Using Mock API' : 'Using Real API'}
                </label>
            </div>
            <div>
                username testuser
            </div>
            <div>
                password password123
            </div>
        </div>
    );
};

export default ApiModeToggle;
