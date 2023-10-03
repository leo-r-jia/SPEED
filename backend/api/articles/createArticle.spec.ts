import createArticle from './createArticle';
import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';

// Mock the external dependencies
jest.mock('../../config/db');
jest.mock('../../src/articles/article.model');

describe('createArticle Serverless Function', () => {
  let mockReq: any;
  let mockRes: any;
  let mockSave: jest.Mock;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mocked request and response objects
    mockReq = {
      method: '',
      body: {},
      headers: {}
    };

    mockRes = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      end: jest.fn()
    };

    // Mock ArticleModel's constructor and save method
    mockSave = jest.fn();
    (ArticleModel as unknown as jest.Mock) = jest.fn().mockImplementation(() => {
      return { save: mockSave };
    });
  });

  it('should handle OPTIONS method', async () => {
    mockReq.method = 'OPTIONS';

    await createArticle(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should create an article for POST method', async () => {
    mockReq.method = 'POST';
    const mockArticleData = { title: 'Test Article', content: 'This is a test' };
    mockReq.body = mockArticleData;
    mockSave.mockResolvedValue(mockArticleData);

    await createArticle(mockReq, mockRes);

    expect(ArticleModel).toHaveBeenCalledWith(mockArticleData);
    expect(mockSave).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockArticleData);
  });

  it('should handle errors during article creation', async () => {
    mockReq.method = 'POST';
    const mockError = new Error('Test Error');
    mockSave.mockRejectedValue(mockError);

    await createArticle(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Test Error');
  });

  it('should return 405 for non-POST/OPTIONS methods', async () => {
    mockReq.method = 'GET';

    await createArticle(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(405);
  });
});
