import approveArticle from './approveArticle';
import { connectToDatabase } from "../../config/db";
import { ArticleModel } from '../../src/articles/article.model';

jest.mock('../../config/db'); // Mock the database connection
jest.mock('../../src/articles/article.model'); // Mock the ArticleModel

describe('approveArticle Serverless Function', () => {

    let mockReq: any;
    let mockRes: any;

    beforeEach(() => {
        // Reset the mocks
        jest.clearAllMocks();

        // Mocked request and response objects
        mockReq = {
            method: '',
            body: {},
            query: {},
            headers: {}
        };
        mockRes = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            end: jest.fn(),
        };
    });

    it('should handle OPTIONS method', async () => {
        mockReq.method = 'OPTIONS';

        await approveArticle(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.end).toHaveBeenCalled();
    });

    it('should return 405 for non-POST methods', async () => {
        mockReq.method = 'GET';

        await approveArticle(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(405);
    });

    // ... add more tests for different scenarios ...
});
